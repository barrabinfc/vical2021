/***

The application is a simulation of a toy robot moving on a square tabletop, of dimensions 5 units x 5 units. There are no other obstructions on the table surface. The robot is free to roam around the surface of the table. Any movement that would result in the robot falling from the table is prevented, however further valid movement commands are still allowed.

The application reads a file using a name passed in the command line, the following commands are valid:

PLACE X,Y,F
MOVE
LEFT
RIGHT
REPORT
Here's some rules for these commands:

PLACE will put the toy robot on the table in position X,Y and facing NORTH, SOUTH, EAST or WEST.
The origin (0,0) is the SOUTH WEST most corner.
All commands are ignored until a valid PLACE is made.
MOVE will move the toy robot one unit forward in the direction it is currently facing.
LEFT and RIGHT rotates the robot 90 degrees in the specified direction without changing the position of the robot.
REPORT announces the X,Y and F of the robot.
The file is assumed to have ASCII encoding. It is assumed that the PLACE command has only one space, that is PLACE 1, 2, NORTH is an invalid command. All commands must be in upcase, all lower and mixed case commands will be ignored.

*/
import debug from 'debug';

export type Vec2 = [number, number];

const DIRECTIONS = ['N', 'S', 'E', 'W'] as const;
export type RobotDirection = typeof DIRECTIONS[number];

const COMMANDS = ['PLACE', 'MOVE', 'LEFT', 'RIGHT', 'REPORT'] as const;
type CommandSymbol = typeof COMMANDS[number];
export type RobotCommand = [CommandSymbol, [...any]];

// Setup logging
let log, warn, info;
log = warn = info = debug('vical:toyrobot');

export class ToyRobot {
  private _direction: RobotDirection = 'N';
  private _position: Vec2 = [0, 0];
  dimensions: Vec2;

  constructor({ dimensions }: { dimensions: Vec2 }) {
    log('Created ToyRobot');
    this.dimensions = dimensions;
  }

  get position() {
    return this._position;
  }
  set position([x, y]: [x: number, y: number]) {
    if (!this.inDimensionBounds([x, y])) {
      warn('not in bounds', x, y);
      return;
    }
    this._position = [x, y];
  }
  get direction() {
    return this._direction;
  }
  set direction(direction: RobotDirection) {
    if (!this.validDirection(direction)) {
      return;
    }
    this._direction = direction;
  }
  /** Counter-Clockwise */
  get angleInRadians() {
    switch (this._direction) {
      case 'E':
        return 0;
      case 'W':
        return Math.PI;
      case 'N':
        return Math.PI / 2;
      case 'S':
        return (3 * Math.PI) / 2;
    }
  }

  get state() {
    const formatedPosition = this.position;
    const report = { x: formatedPosition[0], y: formatedPosition[1], direction: this.direction };
    return report;
  }

  private inDimensionBounds(pos: Vec2) {
    const [x, y] = pos;
    return x >= 0 && x < this.dimensions[0] && y >= 0 && y < this.dimensions[1];
  }
  private validDirection(dir: string): boolean {
    return DIRECTIONS.includes(dir as RobotDirection);
  }

  /**
   * Dynamic dispatch 'action' to the proper method
   */
  private dispatchAction(action: string, args: any[]): any {
    // Ignore empty command
    if (action === ' ') {
      return;
    }
    return this[action.toLowerCase()](...args);
  }

  // PLACE will put the toy robot on the table in position X,Y and facing NORTH, SOUTH, EAST or WEST.
  place(x: string | number, y: string | number, direction: RobotDirection) {
    // Force casting to Number
    x = Number(x);
    y = Number(y);

    if (!(this.validDirection(direction) && this.inDimensionBounds([x, y]))) {
      warn(`Ignoring place(Invalid params): {${x}, ${y}, ${direction}} }`);
      return;
    }
    this.position = [x, y];
    this.direction = direction;
  }

  // MOVE will move the toy robot one unit forward in the direction it is currently facing.
  move() {
    let position: Vec2 = [...this.position];
    switch (this.direction) {
      case 'N':
        position = [position[0], position[1] + 1];
        break;
      case 'S':
        position = [position[0], position[1] - 1];
        break;
      case 'W':
        position = [position[0] - 1, position[1]];
        break;
      case 'E':
        position = [position[0] + 1, position[1]];
        break;
    }

    this.position = position;
  }

  // LEFT rotates the robot 90 degrees (counter-clockwise) in the specified direction without changing the position of the robot.
  left() {
    switch (this.direction) {
      case 'N':
        this.direction = 'W';
        break;
      case 'W':
        this.direction = 'S';
        break;
      case 'S':
        this.direction = 'E';
        break;
      case 'E':
        this.direction = 'N';
        break;
    }
  }
  // RIGHT rotates the robot 90 degrees (counter-clockwise) in the specified direction without changing the position of the robot.
  right() {
    switch (this.direction) {
      case 'N':
        this.direction = 'E';
        break;
      case 'E':
        this.direction = 'S';
        break;
      case 'S':
        this.direction = 'W';
        break;
      case 'W':
        this.direction = 'N';
        break;
    }
  }

  // REPORT announces the X,Y and direction of the robot.
  report() {
    info(this.state);
  }

  /**
   * Run commands in bulk
   */
  runAll(commands: Generator<RobotCommand, void, unknown>) {
    for (let cmd of commands) {
      const [action, args] = cmd;
      this.dispatchAction(action, args);
    }
  }
  /**
   * Run command in series, yielding after each command
   */
  *runStepByStep(commands: Generator<RobotCommand, void, unknown>) {
    let commandNumber = 0;
    for (let cmd of commands) {
      const [action, args] = cmd;
      try {
        this.dispatchAction(action, args);
        yield [action, args];
        commandNumber++;
      } catch (e) {
        throw new Error(`Invalid command(${action} ${args}) at line ${commandNumber}`);
      }
    }
  }
}

/**
 * Parse arguments, with casted numbers
 */
const parseArgsAndCast = (args: string): (string | number)[] => {
  if (!args) {
    return [];
  }

  const params = args.split(',').map((f) => f.trim());
  const isNumber = /^\d+([.|e]\d)*$/; /** int, float and scientific notation */
  return params.map((p) => {
    if (isNumber.test(p)) {
      return Number(p);
    } else {
      return p;
    }
  });
};

export function parseLine(line: string): null | RobotCommand {
  const [command, ...args] = line
    .trim()
    .split(' ')
    .map((p) => p.trim());

  // Skip empty / comments
  if (command !== '' && !command.startsWith('#')) {
    const parsedArgs = parseArgsAndCast(args.join(''));
    return [command as CommandSymbol, parsedArgs];
  } else {
    return null;
  }
}
