import { suite } from 'uvu';
import { expect } from 'chai';
import sinon from 'sinon';

import { ToyRobot, RobotCommand } from './ToyRobot';

let robot;

const toyrobotSuite = suite('ToyRobot');
toyrobotSuite.before(() => {
  sinon.replace(console, 'warn', sinon.fake());
});
toyrobotSuite.before.each(() => {
  robot = new ToyRobot({ dimensions: [5, 5] });
});
toyrobotSuite('ToyRobot constructor', async () => {
  expect(robot.dimensions).to.eql([5, 5]);
});
toyrobotSuite('ToyRobot.report()', async () => {
  let consoleInfoSpy = sinon.spy(console, 'info');
  robot.report();
  expect(consoleInfoSpy.called).to.equal(true);
});

/**
 * Place
 */
toyrobotSuite('ToyRobot.place(...)', async () => {
  robot.place(0, 0, 'N');
  robot.place(2, 2, 'S');
  expect(robot.state).to.eql({ x: 2, y: 2, direction: 'S' });
});
toyrobotSuite('ToyRobot.place(...) out of bounds', async () => {
  robot.place(0, 0, 'N');
  robot.place(-1, 0, 'S');
  expect(robot.state).to.eql({ x: 0, y: 0, direction: 'N' });
});
toyrobotSuite('ToyRobot.place(...) invalid direction', async () => {
  robot.place(0, 0, 'N');
  robot.place(2, 2, 'X');
  expect(robot.state).to.eql({ x: 0, y: 0, direction: 'N' });
});

/**
 *  Move
 */
toyrobotSuite('Toyrobot.move()', async () => {
  // North
  robot.place(0, 0, 'N');
  robot.move();
  expect(robot.state).to.eql({ x: 0, y: 1, direction: 'N' });

  // East
  robot.place(2, 1, 'E');
  robot.move();
  expect(robot.state).to.eql({ x: 3, y: 1, direction: 'E' });

  // South
  robot.place(3, 1, 'S');
  robot.move();
  expect(robot.state).to.eql({ x: 3, y: 0, direction: 'S' });

  // West
  robot.place(2, 0, 'W');
  robot.move();
  expect(robot.state).to.eql({ x: 1, y: 0, direction: 'W' });
});
toyrobotSuite('Toyrobot.move() out of bounds', async () => {
  // North
  robot.place(0, 4, 'N');
  robot.move();
  expect(robot.state).to.eql({ x: 0, y: 4, direction: 'N' });

  // East
  robot.place(4, 1, 'E');
  robot.move();
  expect(robot.state).to.eql({ x: 4, y: 1, direction: 'E' });

  // South
  robot.place(3, 0, 'S');
  robot.move();
  expect(robot.state).to.eql({ x: 3, y: 0, direction: 'S' });

  // West
  robot.place(0, 0, 'W');
  robot.move();
  expect(robot.state).to.eql({ x: 0, y: 0, direction: 'W' });
});

/**
 *  Rotate
 */
toyrobotSuite('ToyRobot.left()', async () => {
  robot.left();
  expect(robot.state).to.eql({ x: 0, y: 0, direction: 'W' });
  robot.left();
  expect(robot.state).to.eql({ x: 0, y: 0, direction: 'S' });
  robot.left();
  expect(robot.state).to.eql({ x: 0, y: 0, direction: 'E' });
  robot.left();
  expect(robot.state).to.eql({ x: 0, y: 0, direction: 'N' });
});

toyrobotSuite('ToyRobot.right()', async () => {
  robot.right();
  expect(robot.state).to.eql({ x: 0, y: 0, direction: 'E' });
  robot.right();
  expect(robot.state).to.eql({ x: 0, y: 0, direction: 'S' });
  robot.right();
  expect(robot.state).to.eql({ x: 0, y: 0, direction: 'W' });
  robot.right();
  expect(robot.state).to.eql({ x: 0, y: 0, direction: 'N' });
});

/**
 * Run
 */
function* commands() {
  const commands: RobotCommand[] = [
    ['PLACE', [0, 0, 'N']],
    ['MOVE', []],
    ['LEFT', []],
    ['LEFT', []],
    ['MOVE', []],
    ['LEFT', []],
    ['LEFT', []]
  ];
  for (let cmd of commands) {
    yield cmd;
  }
}

toyrobotSuite('ToyRobot.runAll()', async () => {
  robot.runAll(commands);
});
toyrobotSuite.only('ToyRobot.runStepByStep()', async () => {
  const robotRunGenerator = robot.runStepByStep(commands());
  for (let stepVal of robotRunGenerator) {
    console.log('step', stepVal);
  }
  robot.report();
});

toyrobotSuite.run();

export { toyrobotSuite };
