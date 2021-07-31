/******/ (function(modules) { // webpackBootstrap
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var chunk = require("./" + "" + chunkId + "." + hotCurrentHash + ".hot-update.js");
/******/ 		hotAddUpdateChunk(chunk.id, chunk.modules);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest() {
/******/ 		try {
/******/ 			var update = require("./" + "" + hotCurrentHash + ".hot-update.json");
/******/ 		} catch (e) {
/******/ 			return Promise.resolve();
/******/ 		}
/******/ 		return Promise.resolve(update);
/******/ 	}
/******/
/******/ 	//eslint-disable-next-line no-unused-vars
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "5c51c71c06a88c3b708d";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_selfInvalidated: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 			invalidate: function() {
/******/ 				this._selfInvalidated = true;
/******/ 				switch (hotStatus) {
/******/ 					case "idle":
/******/ 						hotUpdate = {};
/******/ 						hotUpdate[moduleId] = modules[moduleId];
/******/ 						hotSetStatus("ready");
/******/ 						break;
/******/ 					case "ready":
/******/ 						hotApplyInvalidatedModule(moduleId);
/******/ 						break;
/******/ 					case "prepare":
/******/ 					case "check":
/******/ 					case "dispose":
/******/ 					case "apply":
/******/ 						(hotQueuedInvalidatedModules =
/******/ 							hotQueuedInvalidatedModules || []).push(moduleId);
/******/ 						break;
/******/ 					default:
/******/ 						// ignore requests in error states
/******/ 						break;
/******/ 				}
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash, hotQueuedInvalidatedModules;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus(hotApplyInvalidatedModules() ? "ready" : "idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "main";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 		return hotApplyInternal(options);
/******/ 	}
/******/
/******/ 	function hotApplyInternal(options) {
/******/ 		hotApplyInvalidatedModules();
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (
/******/ 					!module ||
/******/ 					(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 				)
/******/ 					continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire &&
/******/ 				// when called invalidate self-accepting is not possible
/******/ 				!installedModules[moduleId].hot._selfInvalidated
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					parents: installedModules[moduleId].parents.slice(),
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		if (hotUpdateNewHash !== undefined) {
/******/ 			hotCurrentHash = hotUpdateNewHash;
/******/ 			hotUpdateNewHash = undefined;
/******/ 		}
/******/ 		hotUpdate = undefined;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = item.parents;
/******/ 			hotCurrentChildModule = moduleId;
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			return hotApplyInternal(options).then(function(list) {
/******/ 				outdatedModules.forEach(function(moduleId) {
/******/ 					if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 				});
/******/ 				return list;
/******/ 			});
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModules() {
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			if (!hotUpdate) hotUpdate = {};
/******/ 			hotQueuedInvalidatedModules.forEach(hotApplyInvalidatedModule);
/******/ 			hotQueuedInvalidatedModules = undefined;
/******/ 			return true;
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModule(moduleId) {
/******/ 		if (!Object.prototype.hasOwnProperty.call(hotUpdate, moduleId))
/******/ 			hotUpdate[moduleId] = modules[moduleId];
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/webpack/hot/log-apply-result.js":
/*!*****************************************!*\
  !*** (webpack)/hot/log-apply-result.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = function(updatedModules, renewedModules) {
  var unacceptedModules = updatedModules.filter(function(moduleId) {
    return renewedModules && renewedModules.indexOf(moduleId) < 0;
  });
  var log = __webpack_require__(/*! ./log */ "./node_modules/webpack/hot/log.js");
  if (unacceptedModules.length > 0) {
    log("warning", "[HMR] The following modules couldn't be hot updated: (They would need a full reload!)");
    unacceptedModules.forEach(function(moduleId) {
      log("warning", "[HMR]  - " + moduleId);
    });
  }
  if (!renewedModules || renewedModules.length === 0) {
    log("info", "[HMR] Nothing hot updated.");
  } else {
    log("info", "[HMR] Updated modules:");
    renewedModules.forEach(function(moduleId) {
      if (typeof moduleId === "string" && moduleId.indexOf("!") !== -1) {
        var parts = moduleId.split("!");
        log.groupCollapsed("info", "[HMR]  - " + parts.pop());
        log("info", "[HMR]  - " + moduleId);
        log.groupEnd("info");
      } else {
        log("info", "[HMR]  - " + moduleId);
      }
    });
    var numberIds = renewedModules.every(function(moduleId) {
      return typeof moduleId === "number";
    });
    if (numberIds)
      log("info", "[HMR] Consider using the NamedModulesPlugin for module names.");
  }
};


/***/ }),

/***/ "./node_modules/webpack/hot/log.js":
/*!****************************!*\
  !*** (webpack)/hot/log.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

var logLevel = "info";
function dummy() {
}
function shouldLog(level) {
  var shouldLog2 = logLevel === "info" && level === "info" || ["info", "warning"].indexOf(logLevel) >= 0 && level === "warning" || ["info", "warning", "error"].indexOf(logLevel) >= 0 && level === "error";
  return shouldLog2;
}
function logGroup(logFn) {
  return function(level, msg) {
    if (shouldLog(level)) {
      logFn(msg);
    }
  };
}
module.exports = function(level, msg) {
  if (shouldLog(level)) {
    if (level === "info") {
      console.log(msg);
    } else if (level === "warning") {
      console.warn(msg);
    } else if (level === "error") {
      console.error(msg);
    }
  }
};
var group = console.group || dummy;
var groupCollapsed = console.groupCollapsed || dummy;
var groupEnd = console.groupEnd || dummy;
module.exports.group = logGroup(group);
module.exports.groupCollapsed = logGroup(groupCollapsed);
module.exports.groupEnd = logGroup(groupEnd);
module.exports.setLogLevel = function(level) {
  logLevel = level;
};
module.exports.formatError = function(err) {
  var message = err.message;
  var stack = err.stack;
  if (!stack) {
    return message;
  } else if (stack.indexOf(message) < 0) {
    return message + "\n" + stack;
  } else {
    return stack;
  }
};


/***/ }),

/***/ "./node_modules/webpack/hot/poll.js?1000":
/*!**********************************!*\
  !*** (webpack)/hot/poll.js?1000 ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__resourceQuery) {if (true) {
  var hotPollInterval = +__resourceQuery.substr(1) || 10 * 60 * 1e3;
  var log = __webpack_require__(/*! ./log */ "./node_modules/webpack/hot/log.js");
  var checkForUpdate = function checkForUpdate2(fromUpdate) {
    if (module.hot.status() === "idle") {
      module.hot.check(true).then(function(updatedModules) {
        if (!updatedModules) {
          if (fromUpdate)
            log("info", "[HMR] Update applied.");
          return;
        }
        __webpack_require__(/*! ./log-apply-result */ "./node_modules/webpack/hot/log-apply-result.js")(updatedModules, updatedModules);
        checkForUpdate2(true);
      }).catch(function(err) {
        var status = module.hot.status();
        if (["abort", "fail"].indexOf(status) >= 0) {
          log("warning", "[HMR] Cannot apply update.");
          log("warning", "[HMR] " + log.formatError(err));
          log("warning", "[HMR] You need to restart the application!");
        } else {
          log("warning", "[HMR] Update failed: " + log.formatError(err));
        }
      });
    }
  };
  setInterval(checkForUpdate, hotPollInterval);
} else {}

/* WEBPACK VAR INJECTION */}.call(this, "?1000"))

/***/ }),

/***/ "./src/books/index.ts":
/*!****************************!*\
  !*** ./src/books/index.ts ***!
  \****************************/
/*! exports provided: resolvers, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resolvers", function() { return resolvers; });
/* harmony import */ var graphql_modules__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! graphql-modules */ "graphql-modules");
/* harmony import */ var graphql_modules__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(graphql_modules__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _schema_graphql__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./schema.graphql */ "./src/books/schema.graphql");
/* harmony import */ var _schema_graphql__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_schema_graphql__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _resolver__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./resolver */ "./src/books/resolver.ts");



const resolvers = {
  Query: {
    books: _resolver__WEBPACK_IMPORTED_MODULE_2__["books"]
  }
};
/* harmony default export */ __webpack_exports__["default"] = (Object(graphql_modules__WEBPACK_IMPORTED_MODULE_0__["createModule"])({
  id: "books",
  typeDefs: [_schema_graphql__WEBPACK_IMPORTED_MODULE_1___default.a],
  resolvers
}));


/***/ }),

/***/ "./src/books/resolver.ts":
/*!*******************************!*\
  !*** ./src/books/resolver.ts ***!
  \*******************************/
/*! exports provided: books */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "books", function() { return books; });
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
const BOOKS_BASE_ID = "appOqm0oQNWYyP5Kd";
function books(_0, _1, _2) {
  return __async(this, arguments, function* (_, {limit = 10, page = 0}, {dataSources}) {
    const booksAPI = dataSources.books.api;
    const booksResponse = yield booksAPI.select("Books", {
      pageSize: limit,
      view: "Main View"
    }, page);
    const books2 = booksResponse.map(({id, fields}) => ({
      id,
      name: fields.Name,
      synopsis: fields.Synopsis
    }));
    return books2;
  });
}


/***/ }),

/***/ "./src/books/schema.graphql":
/*!**********************************!*\
  !*** ./src/books/schema.graphql ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {


    var doc = {"kind":"Document","definitions":[{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Book"},"interfaces":[{"kind":"NamedType","name":{"kind":"Name","value":"Node"}}],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"id"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"name"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"synopsis"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"rating"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"directives":[]}]},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Query"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"books"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"limit"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"page"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},"directives":[]}],"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Book"}}},"directives":[]}]}],"loc":{"start":0,"end":145}};
    doc.loc.source = {"body":"type Book implements Node {\n  id: ID!\n  name: String\n  synopsis: String\n  rating: Int\n}\n\ntype Query {\n  books(limit: Int!, page: Int!): [Book]\n}\n","name":"GraphQL request","locationOffset":{"line":1,"column":1}};
  

    var names = {};
    function unique(defs) {
      return defs.filter(
        function(def) {
          if (def.kind !== 'FragmentDefinition') return true;
          var name = def.name.value
          if (names[name]) {
            return false;
          } else {
            names[name] = true;
            return true;
          }
        }
      )
    }
  

      module.exports = doc;
    


/***/ }),

/***/ "./src/dataSources/airtable.ts":
/*!*************************************!*\
  !*** ./src/dataSources/airtable.ts ***!
  \*************************************/
/*! exports provided: Airtable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Airtable", function() { return Airtable; });
/* harmony import */ var apollo_datasource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! apollo-datasource */ "apollo-datasource");
/* harmony import */ var apollo_datasource__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(apollo_datasource__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var asyncairtable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! asyncairtable */ "asyncairtable");
/* harmony import */ var asyncairtable__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(asyncairtable__WEBPACK_IMPORTED_MODULE_1__);


class Airtable extends apollo_datasource__WEBPACK_IMPORTED_MODULE_0__["DataSource"] {
  constructor(config) {
    super();
    this.api = new asyncairtable__WEBPACK_IMPORTED_MODULE_1___default.a(config.apiKey, config.base);
  }
}


/***/ }),

/***/ "./src/dataSources/index.ts":
/*!**********************************!*\
  !*** ./src/dataSources/index.ts ***!
  \**********************************/
/*! exports provided: Airtable, Notion, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return dataSourcesFactory; });
/* harmony import */ var _notion__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./notion */ "./src/dataSources/notion.ts");
/* harmony import */ var _airtable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./airtable */ "./src/dataSources/airtable.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Airtable", function() { return _airtable__WEBPACK_IMPORTED_MODULE_1__["Airtable"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Notion", function() { return _notion__WEBPACK_IMPORTED_MODULE_0__["Notion"]; });

/* harmony import */ var _secrets__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../secrets */ "./src/secrets.ts");





function dataSourcesFactory() {
  return {
    books: new _airtable__WEBPACK_IMPORTED_MODULE_1__["Airtable"]({
      apiKey: _secrets__WEBPACK_IMPORTED_MODULE_2__["default"].AIRTABLE.apiKey,
      base: _secrets__WEBPACK_IMPORTED_MODULE_2__["default"].AIRTABLE.booksBaseId
    }),
    notion: new _notion__WEBPACK_IMPORTED_MODULE_0__["Notion"]({
      auth: _secrets__WEBPACK_IMPORTED_MODULE_2__["default"].NOTION.apiKey
    })
  };
}


/***/ }),

/***/ "./src/dataSources/notion.ts":
/*!***********************************!*\
  !*** ./src/dataSources/notion.ts ***!
  \***********************************/
/*! exports provided: Notion */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Notion", function() { return Notion; });
/* harmony import */ var _notionhq_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @notionhq/client */ "@notionhq/client");
/* harmony import */ var _notionhq_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_notionhq_client__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var apollo_datasource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! apollo-datasource */ "apollo-datasource");
/* harmony import */ var apollo_datasource__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(apollo_datasource__WEBPACK_IMPORTED_MODULE_1__);


class Notion extends apollo_datasource__WEBPACK_IMPORTED_MODULE_1__["DataSource"] {
  constructor(config) {
    super();
    this.api = new _notionhq_client__WEBPACK_IMPORTED_MODULE_0__["Client"](config);
  }
}


/***/ }),

/***/ "./src/helpers/slugify.ts":
/*!********************************!*\
  !*** ./src/helpers/slugify.ts ***!
  \********************************/
/*! exports provided: slugify */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "slugify", function() { return slugify; });
/* harmony import */ var slugify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! slugify */ "slugify");
/* harmony import */ var slugify__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(slugify__WEBPACK_IMPORTED_MODULE_0__);

function slugify(txt) {
  return slugify__WEBPACK_IMPORTED_MODULE_0___default()(txt, {remove: /[*+~.()'"!:@]/g});
}


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var apollo_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! apollo-server */ "apollo-server");
/* harmony import */ var apollo_server__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(apollo_server__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var graphql_modules__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! graphql-modules */ "graphql-modules");
/* harmony import */ var graphql_modules__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(graphql_modules__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var apollo_server_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! apollo-server-core */ "apollo-server-core");
/* harmony import */ var apollo_server_core__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(apollo_server_core__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _dataSources__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dataSources */ "./src/dataSources/index.ts");
/* harmony import */ var _books_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./books/index */ "./src/books/index.ts");
/* harmony import */ var _projects_index__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./projects/index */ "./src/projects/index.ts");






const app = Object(graphql_modules__WEBPACK_IMPORTED_MODULE_1__["createApplication"])({
  modules: [_books_index__WEBPACK_IMPORTED_MODULE_4__["default"], _projects_index__WEBPACK_IMPORTED_MODULE_5__["default"]]
});
const schema = app.createSchemaForApollo();
const server = new apollo_server__WEBPACK_IMPORTED_MODULE_0__["ApolloServer"]({
  schema,
  dataSources: _dataSources__WEBPACK_IMPORTED_MODULE_3__["default"],
  tracing: true,
  plugins: [Object(apollo_server_core__WEBPACK_IMPORTED_MODULE_2__["ApolloServerPluginUsageReportingDisabled"])()]
});
server.listen().then(({url}) => {
  console.log(`\u{1F680}  Server ready at ${url}`);
});
if (true) {
  module.hot.accept();
  module.hot.dispose(() => null);
}


/***/ }),

/***/ "./src/notion/Notion.graphql":
/*!***********************************!*\
  !*** ./src/notion/Notion.graphql ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


    var doc = {"kind":"Document","definitions":[{"kind":"EnumTypeDefinition","name":{"kind":"Name","value":"RichTextTypeEnum"},"directives":[],"values":[{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"text"},"directives":[]},{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"mention"},"directives":[]},{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"equation"},"directives":[]}]},{"kind":"EnumTypeDefinition","name":{"kind":"Name","value":"PropertyTypeEnum"},"directives":[],"values":[{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"title"},"directives":[]},{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"rich_text"},"directives":[]},{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"number"},"directives":[]},{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"select"},"directives":[]},{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"multi_select"},"directives":[]},{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"date"},"directives":[]},{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"people"},"directives":[]},{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"file"},"directives":[]},{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"checkbox"},"directives":[]},{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"url"},"directives":[]},{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"email"},"directives":[]},{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"phone_number"},"directives":[]},{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"formula"},"directives":[]},{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"relation"},"directives":[]},{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"rollup"},"directives":[]},{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"created_time"},"directives":[]},{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"created_by"},"directives":[]},{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"last_edited_time"},"directives":[]},{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"last_edited_by"},"directives":[]}]},{"kind":"EnumTypeDefinition","name":{"kind":"Name","value":"NumberFormatEnum"},"directives":[],"values":[{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"NUMBER"},"directives":[]},{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"NUMBER_WITH_COMMAS"},"directives":[]},{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"PERCENT"},"directives":[]},{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"DOLLAR"},"directives":[]},{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"EURO"},"directives":[]},{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"POUND"},"directives":[]},{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"YEN"},"directives":[]},{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"RUBBLE"},"directives":[]},{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"RUPEE"},"directives":[]},{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"WON"},"directives":[]},{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"YUAN"},"directives":[]}]},{"kind":"InterfaceTypeDefinition","name":{"kind":"Name","value":"NotionParentNode"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"type"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"database_id"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]}]},{"kind":"InterfaceTypeDefinition","name":{"kind":"Name","value":"NotionPage"},"interfaces":[{"kind":"NamedType","name":{"kind":"Name","value":"Node"}}],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"id"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"object"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"url"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"parent"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"NotionParentNode"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"created_time"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"last_edited_time"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"archived"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"properties"},"arguments":[],"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Property"}}},"directives":[]}]},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"NotionDatabase"},"interfaces":[{"kind":"NamedType","name":{"kind":"Name","value":"Node"}}],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"id"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"object"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"created_time"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"last_edited_time"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"title"},"arguments":[],"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RichText"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"properties"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}},"directives":[]}]},{"kind":"InterfaceTypeDefinition","name":{"kind":"Name","value":"Property"},"interfaces":[{"kind":"NamedType","name":{"kind":"Name","value":"Node"}}],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"id"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"type"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"PropertyTypeEnum"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"name"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]}]},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"PropertyTitle"},"interfaces":[{"kind":"NamedType","name":{"kind":"Name","value":"Property"}},{"kind":"NamedType","name":{"kind":"Name","value":"Node"}}],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"id"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"type"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"PropertyTypeEnum"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"name"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"title"},"arguments":[],"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RichText"}}},"directives":[]}]},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"PropertyRichText"},"interfaces":[{"kind":"NamedType","name":{"kind":"Name","value":"Property"}},{"kind":"NamedType","name":{"kind":"Name","value":"Node"}}],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"id"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"type"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"PropertyTypeEnum"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"name"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"rich_text"},"arguments":[],"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RichText"}}},"directives":[]}]},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"PropertyMultiSelect"},"interfaces":[{"kind":"NamedType","name":{"kind":"Name","value":"Property"}},{"kind":"NamedType","name":{"kind":"Name","value":"Node"}}],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"id"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"type"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"PropertyTypeEnum"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"name"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"multi_select"},"arguments":[],"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MultiSelectOptionItem"}}},"directives":[]}]},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"PropertyCheckbox"},"interfaces":[{"kind":"NamedType","name":{"kind":"Name","value":"Property"}},{"kind":"NamedType","name":{"kind":"Name","value":"Node"}}],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"id"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"type"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"PropertyTypeEnum"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"name"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"checkbox"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}},"directives":[]}]},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"TextAnnotations"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"bold"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"italic"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"strikethrough"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"underline"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"code"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"color"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]}]},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TextAnnotationsFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TextAnnotations"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bold"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"italic"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"strikethrough"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"underline"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"code"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"color"},"arguments":[],"directives":[]}]}},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Text"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"type"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"RichTextTypeEnum"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"content"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"link"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]}]},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"RichText"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"type"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RichTextTypeEnum"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"plain_text"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"href"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"annotations"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"TextAnnotations"}},"directives":[]}]},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"MultiSelectOptionItem"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"id"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"name"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"color"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]}]},{"kind":"UnionTypeDefinition","name":{"kind":"Name","value":"AnyText"},"directives":[],"types":[{"kind":"NamedType","name":{"kind":"Name","value":"Text"}},{"kind":"NamedType","name":{"kind":"Name","value":"RichText"}}]},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Number"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"format"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]}]}],"loc":{"start":0,"end":2163}};
    doc.loc.source = {"body":"#import \"../types.graphql\"\n#import \"./sort.graphql\"\n\nenum RichTextTypeEnum {\n  text\n  mention\n  equation\n}\n\nenum PropertyTypeEnum {\n  title\n  rich_text\n  number\n  select\n  multi_select\n  date\n  people\n  file\n  checkbox\n  url\n  email\n  phone_number\n  formula\n  relation\n  rollup\n  created_time\n  created_by\n  last_edited_time\n  last_edited_by\n}\n\nenum NumberFormatEnum {\n  NUMBER\n  NUMBER_WITH_COMMAS\n  PERCENT\n  DOLLAR\n  EURO\n  POUND\n  YEN\n  RUBBLE\n  RUPEE\n  WON\n  YUAN\n}\n\n###############\n\ninterface NotionParentNode {\n  type: String\n  database_id: String\n}\n\ninterface NotionPage implements Node {\n  id: ID!\n  object: String\n  url: String\n  parent: NotionParentNode\n  created_time: String\n  last_edited_time: String\n  archived: Boolean\n  properties: [Property]\n}\n\ntype NotionDatabase implements Node {\n  id: ID!\n  object: String\n  created_time: String!\n  last_edited_time: String!\n  title: [RichText]\n  properties: JSONObject\n}\n\n###############\n\ninterface Property implements Node {\n  id: ID!\n  type: PropertyTypeEnum\n  name: String!\n}\n\ntype PropertyTitle implements Property & Node {\n  id: ID!\n  type: PropertyTypeEnum\n  name: String!\n  title: [RichText]\n}\n\ntype PropertyRichText implements Property & Node {\n  id: ID!\n  type: PropertyTypeEnum\n  name: String!\n  rich_text: [RichText]\n}\n\ntype PropertyMultiSelect implements Property & Node {\n  id: ID!\n  type: PropertyTypeEnum\n  name: String!\n  multi_select: [MultiSelectOptionItem]\n}\n\ntype PropertyCheckbox implements Property & Node {\n  id: ID!\n  type: PropertyTypeEnum\n  name: String!\n  checkbox: Boolean\n}\n\n#############\n\ntype TextAnnotations {\n  bold: Boolean\n  italic: Boolean\n  strikethrough: Boolean\n  underline: Boolean\n  code: Boolean\n  color: String\n}\nfragment TextAnnotationsFragment on TextAnnotations {\n  bold\n  italic\n  strikethrough\n  underline\n  code\n  color\n}\n\ntype Text {\n  type: RichTextTypeEnum\n  content: String\n  link: String\n}\n\ntype RichText {\n  type: RichTextTypeEnum!\n  plain_text: String!\n  href: String\n  annotations: TextAnnotations\n}\n\ntype MultiSelectOptionItem {\n  id: ID!\n  name: String\n  color: String\n}\n\nunion AnyText = Text | RichText\n\n########\n\ntype Number {\n  format: String\n}\n","name":"GraphQL request","locationOffset":{"line":1,"column":1}};
  

    var names = {};
    function unique(defs) {
      return defs.filter(
        function(def) {
          if (def.kind !== 'FragmentDefinition') return true;
          var name = def.name.value
          if (names[name]) {
            return false;
          } else {
            names[name] = true;
            return true;
          }
        }
      )
    }
  doc.definitions = doc.definitions.concat(unique(__webpack_require__(/*! ../types.graphql */ "./src/types.graphql").definitions));
doc.definitions = doc.definitions.concat(unique(__webpack_require__(/*! ./sort.graphql */ "./src/notion/sort.graphql").definitions));


    // Collect any fragment/type references from a node, adding them to the refs Set
    function collectFragmentReferences(node, refs) {
      if (node.kind === "FragmentSpread") {
        refs.add(node.name.value);
      } else if (node.kind === "VariableDefinition") {
        var type = node.type;
        if (type.kind === "NamedType") {
          refs.add(type.name.value);
        }
      }

      if (node.selectionSet) {
        node.selectionSet.selections.forEach(function(selection) {
          collectFragmentReferences(selection, refs);
        });
      }

      if (node.variableDefinitions) {
        node.variableDefinitions.forEach(function(def) {
          collectFragmentReferences(def, refs);
        });
      }

      if (node.definitions) {
        node.definitions.forEach(function(def) {
          collectFragmentReferences(def, refs);
        });
      }
    }

    var definitionRefs = {};
    (function extractReferences() {
      doc.definitions.forEach(function(def) {
        if (def.name) {
          var refs = new Set();
          collectFragmentReferences(def, refs);
          definitionRefs[def.name.value] = refs;
        }
      });
    })();

    function findOperation(doc, name) {
      for (var i = 0; i < doc.definitions.length; i++) {
        var element = doc.definitions[i];
        if (element.name && element.name.value == name) {
          return element;
        }
      }
    }

    function oneQuery(doc, operationName) {
      // Copy the DocumentNode, but clear out the definitions
      var newDoc = {
        kind: doc.kind,
        definitions: [findOperation(doc, operationName)]
      };
      if (doc.hasOwnProperty("loc")) {
        newDoc.loc = doc.loc;
      }

      // Now, for the operation we're running, find any fragments referenced by
      // it or the fragments it references
      var opRefs = definitionRefs[operationName] || new Set();
      var allRefs = new Set();
      var newRefs = new Set();

      // IE 11 doesn't support "new Set(iterable)", so we add the members of opRefs to newRefs one by one
      opRefs.forEach(function(refName) {
        newRefs.add(refName);
      });

      while (newRefs.size > 0) {
        var prevRefs = newRefs;
        newRefs = new Set();

        prevRefs.forEach(function(refName) {
          if (!allRefs.has(refName)) {
            allRefs.add(refName);
            var childRefs = definitionRefs[refName] || new Set();
            childRefs.forEach(function(childRef) {
              newRefs.add(childRef);
            });
          }
        });
      }

      allRefs.forEach(function(refName) {
        var op = findOperation(doc, refName);
        if (op) {
          newDoc.definitions.push(op);
        }
      });

      return newDoc;
    }
    
    module.exports = doc;
    
        module.exports["TextAnnotationsFragment"] = oneQuery(doc, "TextAnnotationsFragment");
        


/***/ }),

/***/ "./src/notion/enums.ts":
/*!*****************************!*\
  !*** ./src/notion/enums.ts ***!
  \*****************************/
/*! exports provided: RichTextTypeEnum, PropertyTypeEnum */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RichTextTypeEnum", function() { return RichTextTypeEnum; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PropertyTypeEnum", function() { return PropertyTypeEnum; });
var RichTextTypeEnum;
(function(RichTextTypeEnum2) {
  RichTextTypeEnum2["text"] = "text";
  RichTextTypeEnum2["mention"] = "mention";
  RichTextTypeEnum2["equation"] = "equation";
})(RichTextTypeEnum || (RichTextTypeEnum = {}));
var PropertyTypeEnum;
(function(PropertyTypeEnum2) {
  PropertyTypeEnum2["title"] = "title";
  PropertyTypeEnum2["rich_text"] = "rich_text";
  PropertyTypeEnum2["number"] = "number";
  PropertyTypeEnum2["select"] = "select";
  PropertyTypeEnum2["multi_select"] = "multi_select";
  PropertyTypeEnum2["date"] = "date";
  PropertyTypeEnum2["people"] = "people";
  PropertyTypeEnum2["file"] = "file";
  PropertyTypeEnum2["checkbox"] = "checkbox";
  PropertyTypeEnum2["url"] = "url";
  PropertyTypeEnum2["email"] = "email";
  PropertyTypeEnum2["phone_number"] = "phone_number";
  PropertyTypeEnum2["formula"] = "formula";
  PropertyTypeEnum2["relation"] = "relation";
  PropertyTypeEnum2["rollup"] = "rollup";
  PropertyTypeEnum2["created_time"] = "created_time";
  PropertyTypeEnum2["created_by"] = "created_by";
  PropertyTypeEnum2["last_edited_time"] = "last_edited_time";
  PropertyTypeEnum2["last_edited_by"] = "last_edited_by";
})(PropertyTypeEnum || (PropertyTypeEnum = {}));


/***/ }),

/***/ "./src/notion/helpers.ts":
/*!*******************************!*\
  !*** ./src/notion/helpers.ts ***!
  \*******************************/
/*! exports provided: isRichText, isTitle, getPlainText */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isRichText", function() { return isRichText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isTitle", function() { return isTitle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPlainText", function() { return getPlainText; });
function isRichText(prop) {
  return prop && "rich_text" in prop;
}
function isTitle(prop) {
  return prop && "title" in prop;
}
function getPlainText(prop) {
  var _a, _b;
  if (isTitle(prop)) {
    return (_a = prop.title[0]) == null ? void 0 : _a.plain_text;
  } else if (isRichText(prop)) {
    return (_b = prop.rich_text[0]) == null ? void 0 : _b.plain_text;
  } else {
    return void 0;
  }
}


/***/ }),

/***/ "./src/notion/resolvers.ts":
/*!*********************************!*\
  !*** ./src/notion/resolvers.ts ***!
  \*********************************/
/*! exports provided: AnyText, Property */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnyText", function() { return AnyText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Property", function() { return Property; });
/* harmony import */ var change_case__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! change-case */ "change-case");
/* harmony import */ var change_case__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(change_case__WEBPACK_IMPORTED_MODULE_0__);

const AnyText = {
  __resolveType: (text) => Object(change_case__WEBPACK_IMPORTED_MODULE_0__["pascalCase"])(text.type)
};
const Property = {
  __resolveType(obj, ctx, info) {
    return Object(change_case__WEBPACK_IMPORTED_MODULE_0__["pascalCase"])(`property_${obj.type}`);
  }
};


/***/ }),

/***/ "./src/notion/sort.graphql":
/*!*********************************!*\
  !*** ./src/notion/sort.graphql ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {


    var doc = {"kind":"Document","definitions":[{"kind":"EnumTypeDefinition","name":{"kind":"Name","value":"NotionSortTimestamp"},"directives":[],"values":[{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"created_time"},"directives":[]},{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"last_edited_time"},"directives":[]}]},{"kind":"EnumTypeDefinition","name":{"kind":"Name","value":"NotionSortDirection"},"directives":[],"values":[{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"ascending"},"directives":[]},{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"descending"},"directives":[]}]},{"kind":"InputObjectTypeDefinition","name":{"kind":"Name","value":"NotionSort"},"directives":[],"fields":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"property"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"timestamp"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"NotionSortTimestamp"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"direction"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"NotionSortDirection"}},"directives":[]}]}],"loc":{"start":0,"end":224}};
    doc.loc.source = {"body":"enum NotionSortTimestamp {\n  created_time\n  last_edited_time\n}\nenum NotionSortDirection {\n  ascending\n  descending\n}\n\ninput NotionSort {\n  property: String\n  timestamp: NotionSortTimestamp\n  direction: NotionSortDirection\n}\n","name":"GraphQL request","locationOffset":{"line":1,"column":1}};
  

    var names = {};
    function unique(defs) {
      return defs.filter(
        function(def) {
          if (def.kind !== 'FragmentDefinition') return true;
          var name = def.name.value
          if (names[name]) {
            return false;
          } else {
            names[name] = true;
            return true;
          }
        }
      )
    }
  

      module.exports = doc;
    


/***/ }),

/***/ "./src/projects/index.ts":
/*!*******************************!*\
  !*** ./src/projects/index.ts ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var graphql_modules__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! graphql-modules */ "graphql-modules");
/* harmony import */ var graphql_modules__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(graphql_modules__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _schema_graphql__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./schema.graphql */ "./src/projects/schema.graphql");
/* harmony import */ var _schema_graphql__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_schema_graphql__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _resolvers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./resolvers */ "./src/projects/resolvers.ts");



/* harmony default export */ __webpack_exports__["default"] = (Object(graphql_modules__WEBPACK_IMPORTED_MODULE_0__["createModule"])({
  id: "projects",
  dirname: __dirname,
  typeDefs: [_schema_graphql__WEBPACK_IMPORTED_MODULE_1___default.a],
  resolvers: _resolvers__WEBPACK_IMPORTED_MODULE_2__["default"]
}));


/***/ }),

/***/ "./src/projects/resolvers.ts":
/*!***********************************!*\
  !*** ./src/projects/resolvers.ts ***!
  \***********************************/
/*! exports provided: projects, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "projects", function() { return projects; });
/* harmony import */ var graphql_type_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! graphql-type-json */ "graphql-type-json");
/* harmony import */ var graphql_type_json__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(graphql_type_json__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _helpers_slugify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/slugify */ "./src/helpers/slugify.ts");
/* harmony import */ var _notion_enums__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../notion/enums */ "./src/notion/enums.ts");
/* harmony import */ var _notion_helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../notion/helpers */ "./src/notion/helpers.ts");
/* harmony import */ var _notion_resolvers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../notion/resolvers */ "./src/notion/resolvers.ts");
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, {enumerable: true, configurable: true, writable: true, value}) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};





const databaseId = "9e64c3a89a9f4f858d5ab1674109cf7d";
function projects(_0, _1, _2) {
  return __async(this, arguments, function* (_, {
    start_cursor,
    sorts,
    page_size = 100
  }, {dataSources}) {
    const projectsAPI = dataSources.notion.api;
    const response = yield projectsAPI.databases.query({
      database_id: databaseId,
      start_cursor,
      page_size,
      sorts
    });
    const projects2 = response.results;
    console.log(projects2);
    function validateProjectProperties(proj) {
      const requiredProperties = ["Name", "slug"];
      requiredProperties.forEach((reqProp) => {
        if (!(reqProp in proj.properties)) {
          throw new TypeError(`Notion Page ${proj.id} is missing property ${reqProp}`);
        }
      });
      return proj;
    }
    return {
      totalCount: void 0,
      edges: projects2.map(validateProjectProperties).map((item) => {
        const name = Object(_notion_helpers__WEBPACK_IMPORTED_MODULE_3__["getPlainText"])(item.properties["Name"]);
        const slug = Object(_notion_helpers__WEBPACK_IMPORTED_MODULE_3__["getPlainText"])(item.properties["slug"]) || Object(_helpers_slugify__WEBPACK_IMPORTED_MODULE_1__["slugify"])(name);
        return {
          node: {
            id: item.id,
            name,
            title: name,
            slug: slug.toLowerCase(),
            created_time: item.created_time,
            last_edited_time: item.last_edited_time,
            published: item.properties["published"],
            archived: item.archived,
            properties: Object.entries(item.properties).map((_a) => {
              var [key, _b] = _a, _c = _b, {id, type} = _c, rest = __objRest(_c, ["id", "type"]);
              return __spreadValues({
                id,
                name: key,
                type
              }, rest);
            })
          },
          cursor: item.id
        };
      }),
      pageInfo: {
        endCursor: response.next_cursor,
        hasNextPage: response.has_more
      }
    };
  });
}
/* harmony default export */ __webpack_exports__["default"] = (__spreadProps(__spreadValues(__spreadValues({
  JSONObject: graphql_type_json__WEBPACK_IMPORTED_MODULE_0__["GraphQLJSONObject"]
}, _notion_enums__WEBPACK_IMPORTED_MODULE_2__), _notion_resolvers__WEBPACK_IMPORTED_MODULE_4__), {
  Query: {
    projects
  }
}));


/***/ }),

/***/ "./src/projects/schema.graphql":
/*!*************************************!*\
  !*** ./src/projects/schema.graphql ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


    var doc = {"kind":"Document","definitions":[{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"ProjectItem"},"interfaces":[{"kind":"NamedType","name":{"kind":"Name","value":"Node"}}],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"id"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"name"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"slug"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"title"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"description"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"created_time"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"last_edited_time"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"published"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"archived"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"properties"},"arguments":[],"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Property"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"content"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}},"directives":[]}]},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"ProjectItemsEdge"},"interfaces":[{"kind":"NamedType","name":{"kind":"Name","value":"Edge"}}],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"node"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"ProjectItem"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"cursor"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]}]},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"ProjectItemsConnection"},"interfaces":[{"kind":"NamedType","name":{"kind":"Name","value":"Page"}}],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"totalCount"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"edges"},"arguments":[],"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ProjectItemsEdge"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"pageInfo"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PageInfo"}}},"directives":[]}]},{"kind":"ObjectTypeExtension","name":{"kind":"Name","value":"Query"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"projects"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"start_cursor"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"page_size"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"sorts"},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"NotionSort"}}},"directives":[]}],"type":{"kind":"NamedType","name":{"kind":"Name","value":"ProjectItemsConnection"}},"directives":[]}]}],"loc":{"start":0,"end":681}};
    doc.loc.source = {"body":"#import \"../notion/Notion.graphql\"\n\ntype ProjectItem implements Node {\n  id: ID!\n  name: String!\n  slug: String!\n  title: String!\n  description: String\n\n  created_time: String\n  last_edited_time: String\n\n  published: Boolean\n  archived: Boolean\n\n  properties: [Property]\n  content: JSONObject\n}\n\ntype ProjectItemsEdge implements Edge {\n  node: ProjectItem\n  cursor: ID!\n}\n\ntype ProjectItemsConnection implements Page {\n  totalCount: Int\n  edges: [ProjectItemsEdge]\n  pageInfo: PageInfo!\n}\n\nextend type Query {\n  # projectsDatabase: Database\n  projects(\n    start_cursor: ID\n    page_size: Int\n    sorts: [NotionSort]\n  ): ProjectItemsConnection\n  # project(id: ID!): ProjectItem\n}\n","name":"GraphQL request","locationOffset":{"line":1,"column":1}};
  

    var names = {};
    function unique(defs) {
      return defs.filter(
        function(def) {
          if (def.kind !== 'FragmentDefinition') return true;
          var name = def.name.value
          if (names[name]) {
            return false;
          } else {
            names[name] = true;
            return true;
          }
        }
      )
    }
  doc.definitions = doc.definitions.concat(unique(__webpack_require__(/*! ../notion/Notion.graphql */ "./src/notion/Notion.graphql").definitions));


      module.exports = doc;
    


/***/ }),

/***/ "./src/secrets.ts":
/*!************************!*\
  !*** ./src/secrets.ts ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dotenv */ "dotenv");
/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dotenv__WEBPACK_IMPORTED_MODULE_0__);

dotenv__WEBPACK_IMPORTED_MODULE_0___default.a.config();
/* harmony default export */ __webpack_exports__["default"] = ({
  AIRTABLE: {
    apiKey: process.env["AIRTABLE_APIKEY"] || "<API_KEY_HERE>",
    booksBaseId: "appOqm0oQNWYyP5Kd"
  },
  NOTION: {
    apiKey: process.env["NOTION_API_KEY"] || "<API_KEY_HERE>"
  }
});


/***/ }),

/***/ "./src/types.graphql":
/*!***************************!*\
  !*** ./src/types.graphql ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {


    var doc = {"kind":"Document","definitions":[{"kind":"ScalarTypeDefinition","name":{"kind":"Name","value":"JSONObject"},"directives":[]},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"PageInfo"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"startCursor"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"endCursor"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"hasNextPage"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}},"directives":[]}]},{"kind":"InterfaceTypeDefinition","name":{"kind":"Name","value":"Edge"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"node"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Node"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"cursor"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]}]},{"kind":"InterfaceTypeDefinition","name":{"kind":"Name","value":"Node"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"id"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]}]},{"kind":"InterfaceTypeDefinition","name":{"kind":"Name","value":"Page"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"totalCount"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"edges"},"arguments":[],"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Edge"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"pageInfo"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PageInfo"}}},"directives":[]}]}],"loc":{"start":0,"end":246}};
    doc.loc.source = {"body":"scalar JSONObject\n\ntype PageInfo {\n  startCursor: ID\n  endCursor: ID\n  hasNextPage: Boolean\n}\ninterface Edge {\n  node: Node\n  cursor: ID!\n}\n\ninterface Node {\n  id: ID!\n}\n\ninterface Page {\n  totalCount: Int\n  edges: [Edge]\n  pageInfo: PageInfo!\n}\n","name":"GraphQL request","locationOffset":{"line":1,"column":1}};
  

    var names = {};
    function unique(defs) {
      return defs.filter(
        function(def) {
          if (def.kind !== 'FragmentDefinition') return true;
          var name = def.name.value
          if (names[name]) {
            return false;
          } else {
            names[name] = true;
            return true;
          }
        }
      )
    }
  

      module.exports = doc;
    


/***/ }),

/***/ 0:
/*!**************************************************!*\
  !*** multi webpack/hot/poll?1000 ./src/index.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! webpack/hot/poll?1000 */"./node_modules/webpack/hot/poll.js?1000");
module.exports = __webpack_require__(/*! /Users/vitorcalejuri/Projects/vical.me/apollo/src/index.ts */"./src/index.ts");


/***/ }),

/***/ "@notionhq/client":
/*!***********************************!*\
  !*** external "@notionhq/client" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@notionhq/client");

/***/ }),

/***/ "apollo-datasource":
/*!************************************!*\
  !*** external "apollo-datasource" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("apollo-datasource");

/***/ }),

/***/ "apollo-server":
/*!********************************!*\
  !*** external "apollo-server" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("apollo-server");

/***/ }),

/***/ "apollo-server-core":
/*!*************************************!*\
  !*** external "apollo-server-core" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("apollo-server-core");

/***/ }),

/***/ "asyncairtable":
/*!********************************!*\
  !*** external "asyncairtable" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("asyncairtable");

/***/ }),

/***/ "change-case":
/*!******************************!*\
  !*** external "change-case" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("change-case");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),

/***/ "graphql-modules":
/*!**********************************!*\
  !*** external "graphql-modules" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("graphql-modules");

/***/ }),

/***/ "graphql-type-json":
/*!************************************!*\
  !*** external "graphql-type-json" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("graphql-type-json");

/***/ }),

/***/ "slugify":
/*!**************************!*\
  !*** external "slugify" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("slugify");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9ob3QvbG9nLWFwcGx5LXJlc3VsdC5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2hvdC9sb2cuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9ob3QvcG9sbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYm9va3MvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Jvb2tzL3Jlc29sdmVyLnRzIiwid2VicGFjazovLy8uL3NyYy9ib29rcy9zY2hlbWEuZ3JhcGhxbCIsIndlYnBhY2s6Ly8vLi9zcmMvZGF0YVNvdXJjZXMvYWlydGFibGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RhdGFTb3VyY2VzL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9kYXRhU291cmNlcy9ub3Rpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2hlbHBlcnMvc2x1Z2lmeS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL25vdGlvbi9Ob3Rpb24uZ3JhcGhxbCIsIndlYnBhY2s6Ly8vLi9zcmMvbm90aW9uL2VudW1zLnRzIiwid2VicGFjazovLy8uL3NyYy9ub3Rpb24vaGVscGVycy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbm90aW9uL3Jlc29sdmVycy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbm90aW9uL3NvcnQuZ3JhcGhxbCIsIndlYnBhY2s6Ly8vLi9zcmMvcHJvamVjdHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2plY3RzL3Jlc29sdmVycy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcHJvamVjdHMvc2NoZW1hLmdyYXBocWwiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlY3JldHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3R5cGVzLmdyYXBocWwiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiQG5vdGlvbmhxL2NsaWVudFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImFwb2xsby1kYXRhc291cmNlXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYXBvbGxvLXNlcnZlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImFwb2xsby1zZXJ2ZXItY29yZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImFzeW5jYWlydGFibGVcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJjaGFuZ2UtY2FzZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImRvdGVudlwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImdyYXBocWwtbW9kdWxlc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImdyYXBocWwtdHlwZS1qc29uXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwic2x1Z2lmeVwiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsSUFBSTtRQUNKO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsTUFBTTtRQUNOO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLEtBQUs7UUFDTDtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLE1BQU07UUFDTjtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsS0FBSzs7UUFFTDtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7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QUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQSxjQUFjLDRCQUE0QjtRQUMxQztRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLE1BQU07UUFDTjtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLElBQUk7O1FBRUo7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBOztRQUVBO1FBQ0E7UUFDQSxlQUFlLDRCQUE0QjtRQUMzQztRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBLGVBQWUsNEJBQTRCO1FBQzNDO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxpQkFBaUIsdUNBQXVDO1FBQ3hEO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFD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LHlDQUF5Qyw2QkFBNkIsNENBQTRDLGlDQUFpQyw2QkFBNkIsd0JBQXdCLDJCQUEyQiw4QkFBOEIsaUJBQWlCLEVBQUUsaUNBQWlDLCtCQUErQix3QkFBd0IsNkJBQTZCLDJCQUEyQiw2QkFBNkIsaUJBQWlCLEVBQUUsRUFBRSx5Q0FBeUMsNkJBQTZCLDRDQUE0QyxpQ0FBaUMsMkJBQTJCLHdCQUF3Qiw2QkFBNkIsMkJBQTJCLDZCQUE2QixpQkFBaUIsRUFBRSxFQUFFLHlDQUF5Qyw2QkFBNkIsNENBQTRDLGlDQUFpQyxtQ0FBbUMsd0JBQXdCLDJCQUEyQiw2QkFBNkIsaUJBQWlCLEVBQUUsaUNBQWlDLDhCQUE4Qix3QkFBd0IsMEJBQTBCLDJCQUEyQiwrQkFBK0IsaUJBQWlCLEVBQUUsaUNBQWlDLGlDQUFpQyx3QkFBd0IsNkJBQTZCLDJCQUEyQixtQ0FBbUMsaUJBQWlCLEVBQUUsU0FBUztBQUN4cUUsc0JBQXNCLDRDQUE0QywrREFBK0Qsa0JBQWtCLGdDQUFnQyxvQkFBb0IsY0FBYyxvQkFBb0IsOERBQThELCtDQUErQzs7O0FBR3RWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0QkEsNkM7Ozs7Ozs7Ozs7O0FDQUEsOEM7Ozs7Ozs7Ozs7O0FDQUEsMEM7Ozs7Ozs7Ozs7O0FDQUEsK0M7Ozs7Ozs7Ozs7O0FDQUEsMEM7Ozs7Ozs7Ozs7O0FDQUEsd0M7Ozs7Ozs7Ozs7O0FDQUEsbUM7Ozs7Ozs7Ozs7O0FDQUEsNEM7Ozs7Ozs7Ozs7O0FDQUEsOEM7Ozs7Ozs7Ozs7O0FDQUEsb0MiLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3REb3dubG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0dmFyIGNodW5rID0gcmVxdWlyZShcIi4vXCIgKyBcIlwiICsgY2h1bmtJZCArIFwiLlwiICsgaG90Q3VycmVudEhhc2ggKyBcIi5ob3QtdXBkYXRlLmpzXCIpO1xuIFx0XHRob3RBZGRVcGRhdGVDaHVuayhjaHVuay5pZCwgY2h1bmsubW9kdWxlcyk7XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRNYW5pZmVzdCgpIHtcbiBcdFx0dHJ5IHtcbiBcdFx0XHR2YXIgdXBkYXRlID0gcmVxdWlyZShcIi4vXCIgKyBcIlwiICsgaG90Q3VycmVudEhhc2ggKyBcIi5ob3QtdXBkYXRlLmpzb25cIik7XG4gXHRcdH0gY2F0Y2ggKGUpIHtcbiBcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gXHRcdH1cbiBcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSh1cGRhdGUpO1xuIFx0fVxuXG4gXHQvL2VzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90RGlzcG9zZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0ZGVsZXRlIGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcbiBcdH1cblxuIFx0dmFyIGhvdEFwcGx5T25VcGRhdGUgPSB0cnVlO1xuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudEhhc2ggPSBcIjVjNTFjNzFjMDZhODhjM2I3MDhkXCI7XG4gXHR2YXIgaG90UmVxdWVzdFRpbWVvdXQgPSAxMDAwMDtcbiBcdHZhciBob3RDdXJyZW50TW9kdWxlRGF0YSA9IHt9O1xuIFx0dmFyIGhvdEN1cnJlbnRDaGlsZE1vZHVsZTtcbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRQYXJlbnRzID0gW107XG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50UGFyZW50c1RlbXAgPSBbXTtcblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RDcmVhdGVSZXF1aXJlKG1vZHVsZUlkKSB7XG4gXHRcdHZhciBtZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRpZiAoIW1lKSByZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXztcbiBcdFx0dmFyIGZuID0gZnVuY3Rpb24ocmVxdWVzdCkge1xuIFx0XHRcdGlmIChtZS5ob3QuYWN0aXZlKSB7XG4gXHRcdFx0XHRpZiAoaW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XSkge1xuIFx0XHRcdFx0XHRpZiAoaW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XS5wYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpID09PSAtMSkge1xuIFx0XHRcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0ucGFyZW50cy5wdXNoKG1vZHVsZUlkKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRob3RDdXJyZW50Q2hpbGRNb2R1bGUgPSByZXF1ZXN0O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKG1lLmNoaWxkcmVuLmluZGV4T2YocmVxdWVzdCkgPT09IC0xKSB7XG4gXHRcdFx0XHRcdG1lLmNoaWxkcmVuLnB1c2gocmVxdWVzdCk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdGNvbnNvbGUud2FybihcbiBcdFx0XHRcdFx0XCJbSE1SXSB1bmV4cGVjdGVkIHJlcXVpcmUoXCIgK1xuIFx0XHRcdFx0XHRcdHJlcXVlc3QgK1xuIFx0XHRcdFx0XHRcdFwiKSBmcm9tIGRpc3Bvc2VkIG1vZHVsZSBcIiArXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWRcbiBcdFx0XHRcdCk7XG4gXHRcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFtdO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhyZXF1ZXN0KTtcbiBcdFx0fTtcbiBcdFx0dmFyIE9iamVjdEZhY3RvcnkgPSBmdW5jdGlvbiBPYmplY3RGYWN0b3J5KG5hbWUpIHtcbiBcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fW25hbWVdO1xuIFx0XHRcdFx0fSxcbiBcdFx0XHRcdHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiBcdFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfX1tuYW1lXSA9IHZhbHVlO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH07XG4gXHRcdH07XG4gXHRcdGZvciAodmFyIG5hbWUgaW4gX193ZWJwYWNrX3JlcXVpcmVfXykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChfX3dlYnBhY2tfcmVxdWlyZV9fLCBuYW1lKSAmJlxuIFx0XHRcdFx0bmFtZSAhPT0gXCJlXCIgJiZcbiBcdFx0XHRcdG5hbWUgIT09IFwidFwiXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZm4sIG5hbWUsIE9iamVjdEZhY3RvcnkobmFtZSkpO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRmbi5lID0gZnVuY3Rpb24oY2h1bmtJZCkge1xuIFx0XHRcdGlmIChob3RTdGF0dXMgPT09IFwicmVhZHlcIikgaG90U2V0U3RhdHVzKFwicHJlcGFyZVwiKTtcbiBcdFx0XHRob3RDaHVua3NMb2FkaW5nKys7XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uZShjaHVua0lkKS50aGVuKGZpbmlzaENodW5rTG9hZGluZywgZnVuY3Rpb24oZXJyKSB7XG4gXHRcdFx0XHRmaW5pc2hDaHVua0xvYWRpbmcoKTtcbiBcdFx0XHRcdHRocm93IGVycjtcbiBcdFx0XHR9KTtcblxuIFx0XHRcdGZ1bmN0aW9uIGZpbmlzaENodW5rTG9hZGluZygpIHtcbiBcdFx0XHRcdGhvdENodW5rc0xvYWRpbmctLTtcbiBcdFx0XHRcdGlmIChob3RTdGF0dXMgPT09IFwicHJlcGFyZVwiKSB7XG4gXHRcdFx0XHRcdGlmICghaG90V2FpdGluZ0ZpbGVzTWFwW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRcdFx0aG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKGhvdENodW5rc0xvYWRpbmcgPT09IDAgJiYgaG90V2FpdGluZ0ZpbGVzID09PSAwKSB7XG4gXHRcdFx0XHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9O1xuIFx0XHRmbi50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0XHRpZiAobW9kZSAmIDEpIHZhbHVlID0gZm4odmFsdWUpO1xuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLnQodmFsdWUsIG1vZGUgJiB+MSk7XG4gXHRcdH07XG4gXHRcdHJldHVybiBmbjtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RDcmVhdGVNb2R1bGUobW9kdWxlSWQpIHtcbiBcdFx0dmFyIGhvdCA9IHtcbiBcdFx0XHQvLyBwcml2YXRlIHN0dWZmXG4gXHRcdFx0X2FjY2VwdGVkRGVwZW5kZW5jaWVzOiB7fSxcbiBcdFx0XHRfZGVjbGluZWREZXBlbmRlbmNpZXM6IHt9LFxuIFx0XHRcdF9zZWxmQWNjZXB0ZWQ6IGZhbHNlLFxuIFx0XHRcdF9zZWxmRGVjbGluZWQ6IGZhbHNlLFxuIFx0XHRcdF9zZWxmSW52YWxpZGF0ZWQ6IGZhbHNlLFxuIFx0XHRcdF9kaXNwb3NlSGFuZGxlcnM6IFtdLFxuIFx0XHRcdF9tYWluOiBob3RDdXJyZW50Q2hpbGRNb2R1bGUgIT09IG1vZHVsZUlkLFxuXG4gXHRcdFx0Ly8gTW9kdWxlIEFQSVxuIFx0XHRcdGFjdGl2ZTogdHJ1ZSxcbiBcdFx0XHRhY2NlcHQ6IGZ1bmN0aW9uKGRlcCwgY2FsbGJhY2spIHtcbiBcdFx0XHRcdGlmIChkZXAgPT09IHVuZGVmaW5lZCkgaG90Ll9zZWxmQWNjZXB0ZWQgPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJmdW5jdGlvblwiKSBob3QuX3NlbGZBY2NlcHRlZCA9IGRlcDtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwib2JqZWN0XCIpXG4gXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxuIFx0XHRcdFx0XHRcdGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKCkge307XG4gXHRcdFx0XHRlbHNlIGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwXSA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKCkge307XG4gXHRcdFx0fSxcbiBcdFx0XHRkZWNsaW5lOiBmdW5jdGlvbihkZXApIHtcbiBcdFx0XHRcdGlmIChkZXAgPT09IHVuZGVmaW5lZCkgaG90Ll9zZWxmRGVjbGluZWQgPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIilcbiBcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspXG4gXHRcdFx0XHRcdFx0aG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1tkZXBbaV1dID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1tkZXBdID0gdHJ1ZTtcbiBcdFx0XHR9LFxuIFx0XHRcdGRpc3Bvc2U6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcbiBcdFx0XHR9LFxuIFx0XHRcdGFkZERpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XG4gXHRcdFx0fSxcbiBcdFx0XHRyZW1vdmVEaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdHZhciBpZHggPSBob3QuX2Rpc3Bvc2VIYW5kbGVycy5pbmRleE9mKGNhbGxiYWNrKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkgaG90Ll9kaXNwb3NlSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0fSxcbiBcdFx0XHRpbnZhbGlkYXRlOiBmdW5jdGlvbigpIHtcbiBcdFx0XHRcdHRoaXMuX3NlbGZJbnZhbGlkYXRlZCA9IHRydWU7XG4gXHRcdFx0XHRzd2l0Y2ggKGhvdFN0YXR1cykge1xuIFx0XHRcdFx0XHRjYXNlIFwiaWRsZVwiOlxuIFx0XHRcdFx0XHRcdGhvdFVwZGF0ZSA9IHt9O1xuIFx0XHRcdFx0XHRcdGhvdFVwZGF0ZVttb2R1bGVJZF0gPSBtb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0XHRob3RTZXRTdGF0dXMoXCJyZWFkeVwiKTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcInJlYWR5XCI6XG4gXHRcdFx0XHRcdFx0aG90QXBwbHlJbnZhbGlkYXRlZE1vZHVsZShtb2R1bGVJZCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJwcmVwYXJlXCI6XG4gXHRcdFx0XHRcdGNhc2UgXCJjaGVja1wiOlxuIFx0XHRcdFx0XHRjYXNlIFwiZGlzcG9zZVwiOlxuIFx0XHRcdFx0XHRjYXNlIFwiYXBwbHlcIjpcbiBcdFx0XHRcdFx0XHQoaG90UXVldWVkSW52YWxpZGF0ZWRNb2R1bGVzID1cbiBcdFx0XHRcdFx0XHRcdGhvdFF1ZXVlZEludmFsaWRhdGVkTW9kdWxlcyB8fCBbXSkucHVzaChtb2R1bGVJZCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGRlZmF1bHQ6XG4gXHRcdFx0XHRcdFx0Ly8gaWdub3JlIHJlcXVlc3RzIGluIGVycm9yIHN0YXRlc1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH0sXG5cbiBcdFx0XHQvLyBNYW5hZ2VtZW50IEFQSVxuIFx0XHRcdGNoZWNrOiBob3RDaGVjayxcbiBcdFx0XHRhcHBseTogaG90QXBwbHksXG4gXHRcdFx0c3RhdHVzOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHRpZiAoIWwpIHJldHVybiBob3RTdGF0dXM7XG4gXHRcdFx0XHRob3RTdGF0dXNIYW5kbGVycy5wdXNoKGwpO1xuIFx0XHRcdH0sXG4gXHRcdFx0YWRkU3RhdHVzSGFuZGxlcjogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0aG90U3RhdHVzSGFuZGxlcnMucHVzaChsKTtcbiBcdFx0XHR9LFxuIFx0XHRcdHJlbW92ZVN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdHZhciBpZHggPSBob3RTdGF0dXNIYW5kbGVycy5pbmRleE9mKGwpO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBob3RTdGF0dXNIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHR9LFxuXG4gXHRcdFx0Ly9pbmhlcml0IGZyb20gcHJldmlvdXMgZGlzcG9zZSBjYWxsXG4gXHRcdFx0ZGF0YTogaG90Q3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdXG4gXHRcdH07XG4gXHRcdGhvdEN1cnJlbnRDaGlsZE1vZHVsZSA9IHVuZGVmaW5lZDtcbiBcdFx0cmV0dXJuIGhvdDtcbiBcdH1cblxuIFx0dmFyIGhvdFN0YXR1c0hhbmRsZXJzID0gW107XG4gXHR2YXIgaG90U3RhdHVzID0gXCJpZGxlXCI7XG5cbiBcdGZ1bmN0aW9uIGhvdFNldFN0YXR1cyhuZXdTdGF0dXMpIHtcbiBcdFx0aG90U3RhdHVzID0gbmV3U3RhdHVzO1xuIFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGhvdFN0YXR1c0hhbmRsZXJzLmxlbmd0aDsgaSsrKVxuIFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzW2ldLmNhbGwobnVsbCwgbmV3U3RhdHVzKTtcbiBcdH1cblxuIFx0Ly8gd2hpbGUgZG93bmxvYWRpbmdcbiBcdHZhciBob3RXYWl0aW5nRmlsZXMgPSAwO1xuIFx0dmFyIGhvdENodW5rc0xvYWRpbmcgPSAwO1xuIFx0dmFyIGhvdFdhaXRpbmdGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdFJlcXVlc3RlZEZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90QXZhaWxhYmxlRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3REZWZlcnJlZDtcblxuIFx0Ly8gVGhlIHVwZGF0ZSBpbmZvXG4gXHR2YXIgaG90VXBkYXRlLCBob3RVcGRhdGVOZXdIYXNoLCBob3RRdWV1ZWRJbnZhbGlkYXRlZE1vZHVsZXM7XG5cbiBcdGZ1bmN0aW9uIHRvTW9kdWxlSWQoaWQpIHtcbiBcdFx0dmFyIGlzTnVtYmVyID0gK2lkICsgXCJcIiA9PT0gaWQ7XG4gXHRcdHJldHVybiBpc051bWJlciA/ICtpZCA6IGlkO1xuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RDaGVjayhhcHBseSkge1xuIFx0XHRpZiAoaG90U3RhdHVzICE9PSBcImlkbGVcIikge1xuIFx0XHRcdHRocm93IG5ldyBFcnJvcihcImNoZWNrKCkgaXMgb25seSBhbGxvd2VkIGluIGlkbGUgc3RhdHVzXCIpO1xuIFx0XHR9XG4gXHRcdGhvdEFwcGx5T25VcGRhdGUgPSBhcHBseTtcbiBcdFx0aG90U2V0U3RhdHVzKFwiY2hlY2tcIik7XG4gXHRcdHJldHVybiBob3REb3dubG9hZE1hbmlmZXN0KGhvdFJlcXVlc3RUaW1lb3V0KS50aGVuKGZ1bmN0aW9uKHVwZGF0ZSkge1xuIFx0XHRcdGlmICghdXBkYXRlKSB7XG4gXHRcdFx0XHRob3RTZXRTdGF0dXMoaG90QXBwbHlJbnZhbGlkYXRlZE1vZHVsZXMoKSA/IFwicmVhZHlcIiA6IFwiaWRsZVwiKTtcbiBcdFx0XHRcdHJldHVybiBudWxsO1xuIFx0XHRcdH1cbiBcdFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcCA9IHt9O1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlc01hcCA9IHt9O1xuIFx0XHRcdGhvdEF2YWlsYWJsZUZpbGVzTWFwID0gdXBkYXRlLmM7XG4gXHRcdFx0aG90VXBkYXRlTmV3SGFzaCA9IHVwZGF0ZS5oO1xuXG4gXHRcdFx0aG90U2V0U3RhdHVzKFwicHJlcGFyZVwiKTtcbiBcdFx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdFx0aG90RGVmZXJyZWQgPSB7XG4gXHRcdFx0XHRcdHJlc29sdmU6IHJlc29sdmUsXG4gXHRcdFx0XHRcdHJlamVjdDogcmVqZWN0XG4gXHRcdFx0XHR9O1xuIFx0XHRcdH0pO1xuIFx0XHRcdGhvdFVwZGF0ZSA9IHt9O1xuIFx0XHRcdHZhciBjaHVua0lkID0gXCJtYWluXCI7XG4gXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWxvbmUtYmxvY2tzXG4gXHRcdFx0e1xuIFx0XHRcdFx0aG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0fVxuIFx0XHRcdGlmIChcbiBcdFx0XHRcdGhvdFN0YXR1cyA9PT0gXCJwcmVwYXJlXCIgJiZcbiBcdFx0XHRcdGhvdENodW5rc0xvYWRpbmcgPT09IDAgJiZcbiBcdFx0XHRcdGhvdFdhaXRpbmdGaWxlcyA9PT0gMFxuIFx0XHRcdCkge1xuIFx0XHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXR1cm4gcHJvbWlzZTtcbiBcdFx0fSk7XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90QWRkVXBkYXRlQ2h1bmsoY2h1bmtJZCwgbW9yZU1vZHVsZXMpIHtcbiBcdFx0aWYgKCFob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSB8fCAhaG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0pXG4gXHRcdFx0cmV0dXJuO1xuIFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSA9IGZhbHNlO1xuIFx0XHRmb3IgKHZhciBtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0aG90VXBkYXRlW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYgKC0taG90V2FpdGluZ0ZpbGVzID09PSAwICYmIGhvdENodW5rc0xvYWRpbmcgPT09IDApIHtcbiBcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHRpZiAoIWhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdKSB7XG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzTWFwW2NodW5rSWRdID0gdHJ1ZTtcbiBcdFx0fSBlbHNlIHtcbiBcdFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSA9IHRydWU7XG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzKys7XG4gXHRcdFx0aG90RG93bmxvYWRVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RVcGRhdGVEb3dubG9hZGVkKCkge1xuIFx0XHRob3RTZXRTdGF0dXMoXCJyZWFkeVwiKTtcbiBcdFx0dmFyIGRlZmVycmVkID0gaG90RGVmZXJyZWQ7XG4gXHRcdGhvdERlZmVycmVkID0gbnVsbDtcbiBcdFx0aWYgKCFkZWZlcnJlZCkgcmV0dXJuO1xuIFx0XHRpZiAoaG90QXBwbHlPblVwZGF0ZSkge1xuIFx0XHRcdC8vIFdyYXAgZGVmZXJyZWQgb2JqZWN0IGluIFByb21pc2UgdG8gbWFyayBpdCBhcyBhIHdlbGwtaGFuZGxlZCBQcm9taXNlIHRvXG4gXHRcdFx0Ly8gYXZvaWQgdHJpZ2dlcmluZyB1bmNhdWdodCBleGNlcHRpb24gd2FybmluZyBpbiBDaHJvbWUuXG4gXHRcdFx0Ly8gU2VlIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTQ2NTY2NlxuIFx0XHRcdFByb21pc2UucmVzb2x2ZSgpXG4gXHRcdFx0XHQudGhlbihmdW5jdGlvbigpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIGhvdEFwcGx5KGhvdEFwcGx5T25VcGRhdGUpO1xuIFx0XHRcdFx0fSlcbiBcdFx0XHRcdC50aGVuKFxuIFx0XHRcdFx0XHRmdW5jdGlvbihyZXN1bHQpIHtcbiBcdFx0XHRcdFx0XHRkZWZlcnJlZC5yZXNvbHZlKHJlc3VsdCk7XG4gXHRcdFx0XHRcdH0sXG4gXHRcdFx0XHRcdGZ1bmN0aW9uKGVycikge1xuIFx0XHRcdFx0XHRcdGRlZmVycmVkLnJlamVjdChlcnIpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHQpO1xuIFx0XHR9IGVsc2Uge1xuIFx0XHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0XHRmb3IgKHZhciBpZCBpbiBob3RVcGRhdGUpIHtcbiBcdFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaG90VXBkYXRlLCBpZCkpIHtcbiBcdFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2godG9Nb2R1bGVJZChpZCkpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0XHRkZWZlcnJlZC5yZXNvbHZlKG91dGRhdGVkTW9kdWxlcyk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90QXBwbHkob3B0aW9ucykge1xuIFx0XHRpZiAoaG90U3RhdHVzICE9PSBcInJlYWR5XCIpXG4gXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiYXBwbHkoKSBpcyBvbmx5IGFsbG93ZWQgaW4gcmVhZHkgc3RhdHVzXCIpO1xuIFx0XHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiBcdFx0cmV0dXJuIGhvdEFwcGx5SW50ZXJuYWwob3B0aW9ucyk7XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdEFwcGx5SW50ZXJuYWwob3B0aW9ucykge1xuIFx0XHRob3RBcHBseUludmFsaWRhdGVkTW9kdWxlcygpO1xuXG4gXHRcdHZhciBjYjtcbiBcdFx0dmFyIGk7XG4gXHRcdHZhciBqO1xuIFx0XHR2YXIgbW9kdWxlO1xuIFx0XHR2YXIgbW9kdWxlSWQ7XG5cbiBcdFx0ZnVuY3Rpb24gZ2V0QWZmZWN0ZWRTdHVmZih1cGRhdGVNb2R1bGVJZCkge1xuIFx0XHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbdXBkYXRlTW9kdWxlSWRdO1xuIFx0XHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuXG4gXHRcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLm1hcChmdW5jdGlvbihpZCkge1xuIFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0Y2hhaW46IFtpZF0sXG4gXHRcdFx0XHRcdGlkOiBpZFxuIFx0XHRcdFx0fTtcbiBcdFx0XHR9KTtcbiBcdFx0XHR3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xuIFx0XHRcdFx0dmFyIHF1ZXVlSXRlbSA9IHF1ZXVlLnBvcCgpO1xuIFx0XHRcdFx0dmFyIG1vZHVsZUlkID0gcXVldWVJdGVtLmlkO1xuIFx0XHRcdFx0dmFyIGNoYWluID0gcXVldWVJdGVtLmNoYWluO1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAoXG4gXHRcdFx0XHRcdCFtb2R1bGUgfHxcbiBcdFx0XHRcdFx0KG1vZHVsZS5ob3QuX3NlbGZBY2NlcHRlZCAmJiAhbW9kdWxlLmhvdC5fc2VsZkludmFsaWRhdGVkKVxuIFx0XHRcdFx0KVxuIFx0XHRcdFx0XHRjb250aW51ZTtcbiBcdFx0XHRcdGlmIChtb2R1bGUuaG90Ll9zZWxmRGVjbGluZWQpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtZGVjbGluZWRcIixcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAobW9kdWxlLmhvdC5fbWFpbikge1xuIFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwidW5hY2NlcHRlZFwiLFxuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbW9kdWxlLnBhcmVudHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0dmFyIHBhcmVudElkID0gbW9kdWxlLnBhcmVudHNbaV07XG4gXHRcdFx0XHRcdHZhciBwYXJlbnQgPSBpbnN0YWxsZWRNb2R1bGVzW3BhcmVudElkXTtcbiBcdFx0XHRcdFx0aWYgKCFwYXJlbnQpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRpZiAocGFyZW50LmhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHRcdHR5cGU6IFwiZGVjbGluZWRcIixcbiBcdFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbi5jb25jYXQoW3BhcmVudElkXSksXG4gXHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRwYXJlbnRJZDogcGFyZW50SWRcbiBcdFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmIChvdXRkYXRlZE1vZHVsZXMuaW5kZXhPZihwYXJlbnRJZCkgIT09IC0xKSBjb250aW51ZTtcbiBcdFx0XHRcdFx0aWYgKHBhcmVudC5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xuIFx0XHRcdFx0XHRcdGlmICghb3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdKVxuIFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdID0gW107XG4gXHRcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdLCBbbW9kdWxlSWRdKTtcbiBcdFx0XHRcdFx0XHRjb250aW51ZTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRkZWxldGUgb3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdO1xuIFx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaChwYXJlbnRJZCk7XG4gXHRcdFx0XHRcdHF1ZXVlLnB1c2goe1xuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbi5jb25jYXQoW3BhcmVudElkXSksXG4gXHRcdFx0XHRcdFx0aWQ6IHBhcmVudElkXG4gXHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cblxuIFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHR0eXBlOiBcImFjY2VwdGVkXCIsXG4gXHRcdFx0XHRtb2R1bGVJZDogdXBkYXRlTW9kdWxlSWQsXG4gXHRcdFx0XHRvdXRkYXRlZE1vZHVsZXM6IG91dGRhdGVkTW9kdWxlcyxcbiBcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzOiBvdXRkYXRlZERlcGVuZGVuY2llc1xuIFx0XHRcdH07XG4gXHRcdH1cblxuIFx0XHRmdW5jdGlvbiBhZGRBbGxUb1NldChhLCBiKSB7XG4gXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBiLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHR2YXIgaXRlbSA9IGJbaV07XG4gXHRcdFx0XHRpZiAoYS5pbmRleE9mKGl0ZW0pID09PSAtMSkgYS5wdXNoKGl0ZW0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGF0IGJlZ2luIGFsbCB1cGRhdGVzIG1vZHVsZXMgYXJlIG91dGRhdGVkXG4gXHRcdC8vIHRoZSBcIm91dGRhdGVkXCIgc3RhdHVzIGNhbiBwcm9wYWdhdGUgdG8gcGFyZW50cyBpZiB0aGV5IGRvbid0IGFjY2VwdCB0aGUgY2hpbGRyZW5cbiBcdFx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XG4gXHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0dmFyIGFwcGxpZWRVcGRhdGUgPSB7fTtcblxuIFx0XHR2YXIgd2FyblVuZXhwZWN0ZWRSZXF1aXJlID0gZnVuY3Rpb24gd2FyblVuZXhwZWN0ZWRSZXF1aXJlKCkge1xuIFx0XHRcdGNvbnNvbGUud2FybihcbiBcdFx0XHRcdFwiW0hNUl0gdW5leHBlY3RlZCByZXF1aXJlKFwiICsgcmVzdWx0Lm1vZHVsZUlkICsgXCIpIHRvIGRpc3Bvc2VkIG1vZHVsZVwiXG4gXHRcdFx0KTtcbiBcdFx0fTtcblxuIFx0XHRmb3IgKHZhciBpZCBpbiBob3RVcGRhdGUpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGhvdFVwZGF0ZSwgaWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVJZCA9IHRvTW9kdWxlSWQoaWQpO1xuIFx0XHRcdFx0LyoqIEB0eXBlIHtUT0RPfSAqL1xuIFx0XHRcdFx0dmFyIHJlc3VsdDtcbiBcdFx0XHRcdGlmIChob3RVcGRhdGVbaWRdKSB7XG4gXHRcdFx0XHRcdHJlc3VsdCA9IGdldEFmZmVjdGVkU3R1ZmYobW9kdWxlSWQpO1xuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0cmVzdWx0ID0ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwiZGlzcG9zZWRcIixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogaWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdC8qKiBAdHlwZSB7RXJyb3J8ZmFsc2V9ICovXG4gXHRcdFx0XHR2YXIgYWJvcnRFcnJvciA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGRvQXBwbHkgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBkb0Rpc3Bvc2UgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBjaGFpbkluZm8gPSBcIlwiO1xuIFx0XHRcdFx0aWYgKHJlc3VsdC5jaGFpbikge1xuIFx0XHRcdFx0XHRjaGFpbkluZm8gPSBcIlxcblVwZGF0ZSBwcm9wYWdhdGlvbjogXCIgKyByZXN1bHQuY2hhaW4uam9pbihcIiAtPiBcIik7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRzd2l0Y2ggKHJlc3VsdC50eXBlKSB7XG4gXHRcdFx0XHRcdGNhc2UgXCJzZWxmLWRlY2xpbmVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EZWNsaW5lZCkgb3B0aW9ucy5vbkRlY2xpbmVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZURlY2xpbmVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2Ugb2Ygc2VsZiBkZWNsaW5lOiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm1vZHVsZUlkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJkZWNsaW5lZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGVjbGluZWQpIG9wdGlvbnMub25EZWNsaW5lZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVEZWNsaW5lZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIG9mIGRlY2xpbmVkIGRlcGVuZGVuY3k6IFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQubW9kdWxlSWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdFwiIGluIFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQucGFyZW50SWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcInVuYWNjZXB0ZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vblVuYWNjZXB0ZWQpIG9wdGlvbnMub25VbmFjY2VwdGVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZVVuYWNjZXB0ZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBcIiArIG1vZHVsZUlkICsgXCIgaXMgbm90IGFjY2VwdGVkXCIgKyBjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJhY2NlcHRlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uQWNjZXB0ZWQpIG9wdGlvbnMub25BY2NlcHRlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGRvQXBwbHkgPSB0cnVlO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiZGlzcG9zZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRpc3Bvc2VkKSBvcHRpb25zLm9uRGlzcG9zZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRkb0Rpc3Bvc2UgPSB0cnVlO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRkZWZhdWx0OlxuIFx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIlVuZXhjZXB0aW9uIHR5cGUgXCIgKyByZXN1bHQudHlwZSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoYWJvcnRFcnJvcikge1xuIFx0XHRcdFx0XHRob3RTZXRTdGF0dXMoXCJhYm9ydFwiKTtcbiBcdFx0XHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KGFib3J0RXJyb3IpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGRvQXBwbHkpIHtcbiBcdFx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gPSBob3RVcGRhdGVbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZE1vZHVsZXMsIHJlc3VsdC5vdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHRcdFx0XHRmb3IgKG1vZHVsZUlkIGluIHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdFx0XHRcdGlmIChcbiBcdFx0XHRcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChcbiBcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzLFxuIFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZFxuIFx0XHRcdFx0XHRcdFx0KVxuIFx0XHRcdFx0XHRcdCkge1xuIFx0XHRcdFx0XHRcdFx0aWYgKCFvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pXG4gXHRcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSA9IFtdO1xuIFx0XHRcdFx0XHRcdFx0YWRkQWxsVG9TZXQoXG4gXHRcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSxcbiBcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXVxuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChkb0Rpc3Bvc2UpIHtcbiBcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCBbcmVzdWx0Lm1vZHVsZUlkXSk7XG4gXHRcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gd2FyblVuZXhwZWN0ZWRSZXF1aXJlO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIFN0b3JlIHNlbGYgYWNjZXB0ZWQgb3V0ZGF0ZWQgbW9kdWxlcyB0byByZXF1aXJlIHRoZW0gbGF0ZXIgYnkgdGhlIG1vZHVsZSBzeXN0ZW1cbiBcdFx0dmFyIG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHRmb3IgKGkgPSAwOyBpIDwgb3V0ZGF0ZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0bW9kdWxlSWQgPSBvdXRkYXRlZE1vZHVsZXNbaV07XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gJiZcbiBcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmhvdC5fc2VsZkFjY2VwdGVkICYmXG4gXHRcdFx0XHQvLyByZW1vdmVkIHNlbGYtYWNjZXB0ZWQgbW9kdWxlcyBzaG91bGQgbm90IGJlIHJlcXVpcmVkXG4gXHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSAhPT0gd2FyblVuZXhwZWN0ZWRSZXF1aXJlICYmXG4gXHRcdFx0XHQvLyB3aGVuIGNhbGxlZCBpbnZhbGlkYXRlIHNlbGYtYWNjZXB0aW5nIGlzIG5vdCBwb3NzaWJsZVxuIFx0XHRcdFx0IWluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmhvdC5fc2VsZkludmFsaWRhdGVkXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMucHVzaCh7XG4gXHRcdFx0XHRcdG1vZHVsZTogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdHBhcmVudHM6IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLnBhcmVudHMuc2xpY2UoKSxcbiBcdFx0XHRcdFx0ZXJyb3JIYW5kbGVyOiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZBY2NlcHRlZFxuIFx0XHRcdFx0fSk7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTm93IGluIFwiZGlzcG9zZVwiIHBoYXNlXG4gXHRcdGhvdFNldFN0YXR1cyhcImRpc3Bvc2VcIik7XG4gXHRcdE9iamVjdC5rZXlzKGhvdEF2YWlsYWJsZUZpbGVzTWFwKS5mb3JFYWNoKGZ1bmN0aW9uKGNodW5rSWQpIHtcbiBcdFx0XHRpZiAoaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0gPT09IGZhbHNlKSB7XG4gXHRcdFx0XHRob3REaXNwb3NlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0fVxuIFx0XHR9KTtcblxuIFx0XHR2YXIgaWR4O1xuIFx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMuc2xpY2UoKTtcbiBcdFx0d2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiBcdFx0XHRtb2R1bGVJZCA9IHF1ZXVlLnBvcCgpO1xuIFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdGlmICghbW9kdWxlKSBjb250aW51ZTtcblxuIFx0XHRcdHZhciBkYXRhID0ge307XG5cbiBcdFx0XHQvLyBDYWxsIGRpc3Bvc2UgaGFuZGxlcnNcbiBcdFx0XHR2YXIgZGlzcG9zZUhhbmRsZXJzID0gbW9kdWxlLmhvdC5fZGlzcG9zZUhhbmRsZXJzO1xuIFx0XHRcdGZvciAoaiA9IDA7IGogPCBkaXNwb3NlSGFuZGxlcnMubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdGNiID0gZGlzcG9zZUhhbmRsZXJzW2pdO1xuIFx0XHRcdFx0Y2IoZGF0YSk7XG4gXHRcdFx0fVxuIFx0XHRcdGhvdEN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXSA9IGRhdGE7XG5cbiBcdFx0XHQvLyBkaXNhYmxlIG1vZHVsZSAodGhpcyBkaXNhYmxlcyByZXF1aXJlcyBmcm9tIHRoaXMgbW9kdWxlKVxuIFx0XHRcdG1vZHVsZS5ob3QuYWN0aXZlID0gZmFsc2U7XG5cbiBcdFx0XHQvLyByZW1vdmUgbW9kdWxlIGZyb20gY2FjaGVcbiBcdFx0XHRkZWxldGUgaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG5cbiBcdFx0XHQvLyB3aGVuIGRpc3Bvc2luZyB0aGVyZSBpcyBubyBuZWVkIHRvIGNhbGwgZGlzcG9zZSBoYW5kbGVyXG4gXHRcdFx0ZGVsZXRlIG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcblxuIFx0XHRcdC8vIHJlbW92ZSBcInBhcmVudHNcIiByZWZlcmVuY2VzIGZyb20gYWxsIGNoaWxkcmVuXG4gXHRcdFx0Zm9yIChqID0gMDsgaiA8IG1vZHVsZS5jaGlsZHJlbi5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGNoaWxkID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGUuY2hpbGRyZW5bal1dO1xuIFx0XHRcdFx0aWYgKCFjaGlsZCkgY29udGludWU7XG4gXHRcdFx0XHRpZHggPSBjaGlsZC5wYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSB7XG4gXHRcdFx0XHRcdGNoaWxkLnBhcmVudHMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gcmVtb3ZlIG91dGRhdGVkIGRlcGVuZGVuY3kgZnJvbSBtb2R1bGUgY2hpbGRyZW5cbiBcdFx0dmFyIGRlcGVuZGVuY3k7XG4gXHRcdHZhciBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcztcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBvdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvdXRkYXRlZERlcGVuZGVuY2llcywgbW9kdWxlSWQpXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmIChtb2R1bGUpIHtcbiBcdFx0XHRcdFx0bW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGZvciAoaiA9IDA7IGogPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0XHRcdGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tqXTtcbiBcdFx0XHRcdFx0XHRpZHggPSBtb2R1bGUuY2hpbGRyZW4uaW5kZXhPZihkZXBlbmRlbmN5KTtcbiBcdFx0XHRcdFx0XHRpZiAoaWR4ID49IDApIG1vZHVsZS5jaGlsZHJlbi5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIE5vdyBpbiBcImFwcGx5XCIgcGhhc2VcbiBcdFx0aG90U2V0U3RhdHVzKFwiYXBwbHlcIik7XG5cbiBcdFx0aWYgKGhvdFVwZGF0ZU5ld0hhc2ggIT09IHVuZGVmaW5lZCkge1xuIFx0XHRcdGhvdEN1cnJlbnRIYXNoID0gaG90VXBkYXRlTmV3SGFzaDtcbiBcdFx0XHRob3RVcGRhdGVOZXdIYXNoID0gdW5kZWZpbmVkO1xuIFx0XHR9XG4gXHRcdGhvdFVwZGF0ZSA9IHVuZGVmaW5lZDtcblxuIFx0XHQvLyBpbnNlcnQgbmV3IGNvZGVcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBhcHBsaWVkVXBkYXRlKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChhcHBsaWVkVXBkYXRlLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gYXBwbGllZFVwZGF0ZVttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gY2FsbCBhY2NlcHQgaGFuZGxlcnNcbiBcdFx0dmFyIGVycm9yID0gbnVsbDtcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBvdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvdXRkYXRlZERlcGVuZGVuY2llcywgbW9kdWxlSWQpXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmIChtb2R1bGUpIHtcbiBcdFx0XHRcdFx0bW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRcdHZhciBjYWxsYmFja3MgPSBbXTtcbiBcdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdFx0ZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2ldO1xuIFx0XHRcdFx0XHRcdGNiID0gbW9kdWxlLmhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwZW5kZW5jeV07XG4gXHRcdFx0XHRcdFx0aWYgKGNiKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoY2FsbGJhY2tzLmluZGV4T2YoY2IpICE9PSAtMSkgY29udGludWU7XG4gXHRcdFx0XHRcdFx0XHRjYWxsYmFja3MucHVzaChjYik7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBjYWxsYmFja3MubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0XHRjYiA9IGNhbGxiYWNrc1tpXTtcbiBcdFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdFx0Y2IobW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMpO1xuIFx0XHRcdFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcImFjY2VwdC1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0XHRcdGRlcGVuZGVuY3lJZDogbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbaV0sXG4gXHRcdFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIExvYWQgc2VsZiBhY2NlcHRlZCBtb2R1bGVzXG4gXHRcdGZvciAoaSA9IDA7IGkgPCBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHR2YXIgaXRlbSA9IG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlc1tpXTtcbiBcdFx0XHRtb2R1bGVJZCA9IGl0ZW0ubW9kdWxlO1xuIFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gaXRlbS5wYXJlbnRzO1xuIFx0XHRcdGhvdEN1cnJlbnRDaGlsZE1vZHVsZSA9IG1vZHVsZUlkO1xuIFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKTtcbiBcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdGlmICh0eXBlb2YgaXRlbS5lcnJvckhhbmRsZXIgPT09IFwiZnVuY3Rpb25cIikge1xuIFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdGl0ZW0uZXJyb3JIYW5kbGVyKGVycik7XG4gXHRcdFx0XHRcdH0gY2F0Y2ggKGVycjIpIHtcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvci1oYW5kbGVyLWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyMixcbiBcdFx0XHRcdFx0XHRcdFx0b3JpZ2luYWxFcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyMjtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1hY2NlcHQtZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBoYW5kbGUgZXJyb3JzIGluIGFjY2VwdCBoYW5kbGVycyBhbmQgc2VsZiBhY2NlcHRlZCBtb2R1bGUgbG9hZFxuIFx0XHRpZiAoZXJyb3IpIHtcbiBcdFx0XHRob3RTZXRTdGF0dXMoXCJmYWlsXCIpO1xuIFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XG4gXHRcdH1cblxuIFx0XHRpZiAoaG90UXVldWVkSW52YWxpZGF0ZWRNb2R1bGVzKSB7XG4gXHRcdFx0cmV0dXJuIGhvdEFwcGx5SW50ZXJuYWwob3B0aW9ucykudGhlbihmdW5jdGlvbihsaXN0KSB7XG4gXHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMuZm9yRWFjaChmdW5jdGlvbihtb2R1bGVJZCkge1xuIFx0XHRcdFx0XHRpZiAobGlzdC5pbmRleE9mKG1vZHVsZUlkKSA8IDApIGxpc3QucHVzaChtb2R1bGVJZCk7XG4gXHRcdFx0XHR9KTtcbiBcdFx0XHRcdHJldHVybiBsaXN0O1xuIFx0XHRcdH0pO1xuIFx0XHR9XG5cbiBcdFx0aG90U2V0U3RhdHVzKFwiaWRsZVwiKTtcbiBcdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUpIHtcbiBcdFx0XHRyZXNvbHZlKG91dGRhdGVkTW9kdWxlcyk7XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RBcHBseUludmFsaWRhdGVkTW9kdWxlcygpIHtcbiBcdFx0aWYgKGhvdFF1ZXVlZEludmFsaWRhdGVkTW9kdWxlcykge1xuIFx0XHRcdGlmICghaG90VXBkYXRlKSBob3RVcGRhdGUgPSB7fTtcbiBcdFx0XHRob3RRdWV1ZWRJbnZhbGlkYXRlZE1vZHVsZXMuZm9yRWFjaChob3RBcHBseUludmFsaWRhdGVkTW9kdWxlKTtcbiBcdFx0XHRob3RRdWV1ZWRJbnZhbGlkYXRlZE1vZHVsZXMgPSB1bmRlZmluZWQ7XG4gXHRcdFx0cmV0dXJuIHRydWU7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90QXBwbHlJbnZhbGlkYXRlZE1vZHVsZShtb2R1bGVJZCkge1xuIFx0XHRpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIG1vZHVsZUlkKSlcbiBcdFx0XHRob3RVcGRhdGVbbW9kdWxlSWRdID0gbW9kdWxlc1ttb2R1bGVJZF07XG4gXHR9XG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGhvdDogaG90Q3JlYXRlTW9kdWxlKG1vZHVsZUlkKSxcbiBcdFx0XHRwYXJlbnRzOiAoaG90Q3VycmVudFBhcmVudHNUZW1wID0gaG90Q3VycmVudFBhcmVudHMsIGhvdEN1cnJlbnRQYXJlbnRzID0gW10sIGhvdEN1cnJlbnRQYXJlbnRzVGVtcCksXG4gXHRcdFx0Y2hpbGRyZW46IFtdXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIGhvdENyZWF0ZVJlcXVpcmUobW9kdWxlSWQpKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBfX3dlYnBhY2tfaGFzaF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSBmdW5jdGlvbigpIHsgcmV0dXJuIGhvdEN1cnJlbnRIYXNoOyB9O1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIGhvdENyZWF0ZVJlcXVpcmUoMCkoX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG4iLCIvKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih1cGRhdGVkTW9kdWxlcywgcmVuZXdlZE1vZHVsZXMpIHtcblx0dmFyIHVuYWNjZXB0ZWRNb2R1bGVzID0gdXBkYXRlZE1vZHVsZXMuZmlsdGVyKGZ1bmN0aW9uKG1vZHVsZUlkKSB7XG5cdFx0cmV0dXJuIHJlbmV3ZWRNb2R1bGVzICYmIHJlbmV3ZWRNb2R1bGVzLmluZGV4T2YobW9kdWxlSWQpIDwgMDtcblx0fSk7XG5cdHZhciBsb2cgPSByZXF1aXJlKFwiLi9sb2dcIik7XG5cblx0aWYgKHVuYWNjZXB0ZWRNb2R1bGVzLmxlbmd0aCA+IDApIHtcblx0XHRsb2coXG5cdFx0XHRcIndhcm5pbmdcIixcblx0XHRcdFwiW0hNUl0gVGhlIGZvbGxvd2luZyBtb2R1bGVzIGNvdWxkbid0IGJlIGhvdCB1cGRhdGVkOiAoVGhleSB3b3VsZCBuZWVkIGEgZnVsbCByZWxvYWQhKVwiXG5cdFx0KTtcblx0XHR1bmFjY2VwdGVkTW9kdWxlcy5mb3JFYWNoKGZ1bmN0aW9uKG1vZHVsZUlkKSB7XG5cdFx0XHRsb2coXCJ3YXJuaW5nXCIsIFwiW0hNUl0gIC0gXCIgKyBtb2R1bGVJZCk7XG5cdFx0fSk7XG5cdH1cblxuXHRpZiAoIXJlbmV3ZWRNb2R1bGVzIHx8IHJlbmV3ZWRNb2R1bGVzLmxlbmd0aCA9PT0gMCkge1xuXHRcdGxvZyhcImluZm9cIiwgXCJbSE1SXSBOb3RoaW5nIGhvdCB1cGRhdGVkLlwiKTtcblx0fSBlbHNlIHtcblx0XHRsb2coXCJpbmZvXCIsIFwiW0hNUl0gVXBkYXRlZCBtb2R1bGVzOlwiKTtcblx0XHRyZW5ld2VkTW9kdWxlcy5mb3JFYWNoKGZ1bmN0aW9uKG1vZHVsZUlkKSB7XG5cdFx0XHRpZiAodHlwZW9mIG1vZHVsZUlkID09PSBcInN0cmluZ1wiICYmIG1vZHVsZUlkLmluZGV4T2YoXCIhXCIpICE9PSAtMSkge1xuXHRcdFx0XHR2YXIgcGFydHMgPSBtb2R1bGVJZC5zcGxpdChcIiFcIik7XG5cdFx0XHRcdGxvZy5ncm91cENvbGxhcHNlZChcImluZm9cIiwgXCJbSE1SXSAgLSBcIiArIHBhcnRzLnBvcCgpKTtcblx0XHRcdFx0bG9nKFwiaW5mb1wiLCBcIltITVJdICAtIFwiICsgbW9kdWxlSWQpO1xuXHRcdFx0XHRsb2cuZ3JvdXBFbmQoXCJpbmZvXCIpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0bG9nKFwiaW5mb1wiLCBcIltITVJdICAtIFwiICsgbW9kdWxlSWQpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHZhciBudW1iZXJJZHMgPSByZW5ld2VkTW9kdWxlcy5ldmVyeShmdW5jdGlvbihtb2R1bGVJZCkge1xuXHRcdFx0cmV0dXJuIHR5cGVvZiBtb2R1bGVJZCA9PT0gXCJudW1iZXJcIjtcblx0XHR9KTtcblx0XHRpZiAobnVtYmVySWRzKVxuXHRcdFx0bG9nKFxuXHRcdFx0XHRcImluZm9cIixcblx0XHRcdFx0XCJbSE1SXSBDb25zaWRlciB1c2luZyB0aGUgTmFtZWRNb2R1bGVzUGx1Z2luIGZvciBtb2R1bGUgbmFtZXMuXCJcblx0XHRcdCk7XG5cdH1cbn07XG4iLCJ2YXIgbG9nTGV2ZWwgPSBcImluZm9cIjtcblxuZnVuY3Rpb24gZHVtbXkoKSB7fVxuXG5mdW5jdGlvbiBzaG91bGRMb2cobGV2ZWwpIHtcblx0dmFyIHNob3VsZExvZyA9XG5cdFx0KGxvZ0xldmVsID09PSBcImluZm9cIiAmJiBsZXZlbCA9PT0gXCJpbmZvXCIpIHx8XG5cdFx0KFtcImluZm9cIiwgXCJ3YXJuaW5nXCJdLmluZGV4T2YobG9nTGV2ZWwpID49IDAgJiYgbGV2ZWwgPT09IFwid2FybmluZ1wiKSB8fFxuXHRcdChbXCJpbmZvXCIsIFwid2FybmluZ1wiLCBcImVycm9yXCJdLmluZGV4T2YobG9nTGV2ZWwpID49IDAgJiYgbGV2ZWwgPT09IFwiZXJyb3JcIik7XG5cdHJldHVybiBzaG91bGRMb2c7XG59XG5cbmZ1bmN0aW9uIGxvZ0dyb3VwKGxvZ0ZuKSB7XG5cdHJldHVybiBmdW5jdGlvbihsZXZlbCwgbXNnKSB7XG5cdFx0aWYgKHNob3VsZExvZyhsZXZlbCkpIHtcblx0XHRcdGxvZ0ZuKG1zZyk7XG5cdFx0fVxuXHR9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxldmVsLCBtc2cpIHtcblx0aWYgKHNob3VsZExvZyhsZXZlbCkpIHtcblx0XHRpZiAobGV2ZWwgPT09IFwiaW5mb1wiKSB7XG5cdFx0XHRjb25zb2xlLmxvZyhtc2cpO1xuXHRcdH0gZWxzZSBpZiAobGV2ZWwgPT09IFwid2FybmluZ1wiKSB7XG5cdFx0XHRjb25zb2xlLndhcm4obXNnKTtcblx0XHR9IGVsc2UgaWYgKGxldmVsID09PSBcImVycm9yXCIpIHtcblx0XHRcdGNvbnNvbGUuZXJyb3IobXNnKTtcblx0XHR9XG5cdH1cbn07XG5cbi8qIGVzbGludC1kaXNhYmxlIG5vZGUvbm8tdW5zdXBwb3J0ZWQtZmVhdHVyZXMvbm9kZS1idWlsdGlucyAqL1xudmFyIGdyb3VwID0gY29uc29sZS5ncm91cCB8fCBkdW1teTtcbnZhciBncm91cENvbGxhcHNlZCA9IGNvbnNvbGUuZ3JvdXBDb2xsYXBzZWQgfHwgZHVtbXk7XG52YXIgZ3JvdXBFbmQgPSBjb25zb2xlLmdyb3VwRW5kIHx8IGR1bW15O1xuLyogZXNsaW50LWVuYWJsZSBub2RlL25vLXVuc3VwcG9ydGVkLWZlYXR1cmVzL25vZGUtYnVpbHRpbnMgKi9cblxubW9kdWxlLmV4cG9ydHMuZ3JvdXAgPSBsb2dHcm91cChncm91cCk7XG5cbm1vZHVsZS5leHBvcnRzLmdyb3VwQ29sbGFwc2VkID0gbG9nR3JvdXAoZ3JvdXBDb2xsYXBzZWQpO1xuXG5tb2R1bGUuZXhwb3J0cy5ncm91cEVuZCA9IGxvZ0dyb3VwKGdyb3VwRW5kKTtcblxubW9kdWxlLmV4cG9ydHMuc2V0TG9nTGV2ZWwgPSBmdW5jdGlvbihsZXZlbCkge1xuXHRsb2dMZXZlbCA9IGxldmVsO1xufTtcblxubW9kdWxlLmV4cG9ydHMuZm9ybWF0RXJyb3IgPSBmdW5jdGlvbihlcnIpIHtcblx0dmFyIG1lc3NhZ2UgPSBlcnIubWVzc2FnZTtcblx0dmFyIHN0YWNrID0gZXJyLnN0YWNrO1xuXHRpZiAoIXN0YWNrKSB7XG5cdFx0cmV0dXJuIG1lc3NhZ2U7XG5cdH0gZWxzZSBpZiAoc3RhY2suaW5kZXhPZihtZXNzYWdlKSA8IDApIHtcblx0XHRyZXR1cm4gbWVzc2FnZSArIFwiXFxuXCIgKyBzdGFjaztcblx0fSBlbHNlIHtcblx0XHRyZXR1cm4gc3RhY2s7XG5cdH1cbn07XG4iLCIvKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuLypnbG9iYWxzIF9fcmVzb3VyY2VRdWVyeSAqL1xuaWYgKG1vZHVsZS5ob3QpIHtcblx0dmFyIGhvdFBvbGxJbnRlcnZhbCA9ICtfX3Jlc291cmNlUXVlcnkuc3Vic3RyKDEpIHx8IDEwICogNjAgKiAxMDAwO1xuXHR2YXIgbG9nID0gcmVxdWlyZShcIi4vbG9nXCIpO1xuXG5cdHZhciBjaGVja0ZvclVwZGF0ZSA9IGZ1bmN0aW9uIGNoZWNrRm9yVXBkYXRlKGZyb21VcGRhdGUpIHtcblx0XHRpZiAobW9kdWxlLmhvdC5zdGF0dXMoKSA9PT0gXCJpZGxlXCIpIHtcblx0XHRcdG1vZHVsZS5ob3Rcblx0XHRcdFx0LmNoZWNrKHRydWUpXG5cdFx0XHRcdC50aGVuKGZ1bmN0aW9uKHVwZGF0ZWRNb2R1bGVzKSB7XG5cdFx0XHRcdFx0aWYgKCF1cGRhdGVkTW9kdWxlcykge1xuXHRcdFx0XHRcdFx0aWYgKGZyb21VcGRhdGUpIGxvZyhcImluZm9cIiwgXCJbSE1SXSBVcGRhdGUgYXBwbGllZC5cIik7XG5cdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJlcXVpcmUoXCIuL2xvZy1hcHBseS1yZXN1bHRcIikodXBkYXRlZE1vZHVsZXMsIHVwZGF0ZWRNb2R1bGVzKTtcblx0XHRcdFx0XHRjaGVja0ZvclVwZGF0ZSh0cnVlKTtcblx0XHRcdFx0fSlcblx0XHRcdFx0LmNhdGNoKGZ1bmN0aW9uKGVycikge1xuXHRcdFx0XHRcdHZhciBzdGF0dXMgPSBtb2R1bGUuaG90LnN0YXR1cygpO1xuXHRcdFx0XHRcdGlmIChbXCJhYm9ydFwiLCBcImZhaWxcIl0uaW5kZXhPZihzdGF0dXMpID49IDApIHtcblx0XHRcdFx0XHRcdGxvZyhcIndhcm5pbmdcIiwgXCJbSE1SXSBDYW5ub3QgYXBwbHkgdXBkYXRlLlwiKTtcblx0XHRcdFx0XHRcdGxvZyhcIndhcm5pbmdcIiwgXCJbSE1SXSBcIiArIGxvZy5mb3JtYXRFcnJvcihlcnIpKTtcblx0XHRcdFx0XHRcdGxvZyhcIndhcm5pbmdcIiwgXCJbSE1SXSBZb3UgbmVlZCB0byByZXN0YXJ0IHRoZSBhcHBsaWNhdGlvbiFcIik7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGxvZyhcIndhcm5pbmdcIiwgXCJbSE1SXSBVcGRhdGUgZmFpbGVkOiBcIiArIGxvZy5mb3JtYXRFcnJvcihlcnIpKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdH1cblx0fTtcblx0c2V0SW50ZXJ2YWwoY2hlY2tGb3JVcGRhdGUsIGhvdFBvbGxJbnRlcnZhbCk7XG59IGVsc2Uge1xuXHR0aHJvdyBuZXcgRXJyb3IoXCJbSE1SXSBIb3QgTW9kdWxlIFJlcGxhY2VtZW50IGlzIGRpc2FibGVkLlwiKTtcbn1cbiIsImltcG9ydCB7IGNyZWF0ZU1vZHVsZSB9IGZyb20gXCJncmFwaHFsLW1vZHVsZXNcIjtcblxuaW1wb3J0IHR5cGVEZWZzIGZyb20gXCIuL3NjaGVtYS5ncmFwaHFsXCI7XG5pbXBvcnQgeyBib29rcyB9IGZyb20gXCIuL3Jlc29sdmVyXCI7XG5cbmV4cG9ydCBjb25zdCByZXNvbHZlcnMgPSB7XG4gIFF1ZXJ5OiB7XG4gICAgYm9va3MsXG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVNb2R1bGUoe1xuICBpZDogXCJib29rc1wiLFxuICB0eXBlRGVmczogW3R5cGVEZWZzXSxcbiAgcmVzb2x2ZXJzLFxufSk7XG4iLCJjb25zdCBCT09LU19CQVNFX0lEID0gXCJhcHBPcW0wb1FOV1l5UDVLZFwiO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYm9va3MoXG4gIF86IGFueSxcbiAgeyBsaW1pdCA9IDEwLCBwYWdlID0gMCB9OiB7IGxpbWl0OiBudW1iZXI7IHBhZ2U6IG51bWJlciB9LFxuICB7IGRhdGFTb3VyY2VzIH1cbikge1xuICBjb25zdCBib29rc0FQSSA9IGRhdGFTb3VyY2VzLmJvb2tzLmFwaTtcbiAgY29uc3QgYm9va3NSZXNwb25zZSA9IGF3YWl0IGJvb2tzQVBJLnNlbGVjdChcbiAgICBcIkJvb2tzXCIsXG4gICAge1xuICAgICAgcGFnZVNpemU6IGxpbWl0LFxuICAgICAgdmlldzogXCJNYWluIFZpZXdcIixcbiAgICB9LFxuICAgIHBhZ2VcbiAgKTtcblxuICBjb25zdCBib29rcyA9IGJvb2tzUmVzcG9uc2UubWFwKCh7IGlkLCBmaWVsZHMgfSkgPT4gKHtcbiAgICBpZCxcbiAgICBuYW1lOiBmaWVsZHMuTmFtZSxcbiAgICBzeW5vcHNpczogZmllbGRzLlN5bm9wc2lzLFxuICB9KSk7XG4gIHJldHVybiBib29rcztcbn1cbiIsIlxuICAgIHZhciBkb2MgPSB7XCJraW5kXCI6XCJEb2N1bWVudFwiLFwiZGVmaW5pdGlvbnNcIjpbe1wia2luZFwiOlwiT2JqZWN0VHlwZURlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiQm9va1wifSxcImludGVyZmFjZXNcIjpbe1wia2luZFwiOlwiTmFtZWRUeXBlXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIk5vZGVcIn19XSxcImRpcmVjdGl2ZXNcIjpbXSxcImZpZWxkc1wiOlt7XCJraW5kXCI6XCJGaWVsZERlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiaWRcIn0sXCJhcmd1bWVudHNcIjpbXSxcInR5cGVcIjp7XCJraW5kXCI6XCJOb25OdWxsVHlwZVwiLFwidHlwZVwiOntcImtpbmRcIjpcIk5hbWVkVHlwZVwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJJRFwifX19LFwiZGlyZWN0aXZlc1wiOltdfSx7XCJraW5kXCI6XCJGaWVsZERlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwibmFtZVwifSxcImFyZ3VtZW50c1wiOltdLFwidHlwZVwiOntcImtpbmRcIjpcIk5hbWVkVHlwZVwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJTdHJpbmdcIn19LFwiZGlyZWN0aXZlc1wiOltdfSx7XCJraW5kXCI6XCJGaWVsZERlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwic3lub3BzaXNcIn0sXCJhcmd1bWVudHNcIjpbXSxcInR5cGVcIjp7XCJraW5kXCI6XCJOYW1lZFR5cGVcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiU3RyaW5nXCJ9fSxcImRpcmVjdGl2ZXNcIjpbXX0se1wia2luZFwiOlwiRmllbGREZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcInJhdGluZ1wifSxcImFyZ3VtZW50c1wiOltdLFwidHlwZVwiOntcImtpbmRcIjpcIk5hbWVkVHlwZVwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJJbnRcIn19LFwiZGlyZWN0aXZlc1wiOltdfV19LHtcImtpbmRcIjpcIk9iamVjdFR5cGVEZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIlF1ZXJ5XCJ9LFwiaW50ZXJmYWNlc1wiOltdLFwiZGlyZWN0aXZlc1wiOltdLFwiZmllbGRzXCI6W3tcImtpbmRcIjpcIkZpZWxkRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJib29rc1wifSxcImFyZ3VtZW50c1wiOlt7XCJraW5kXCI6XCJJbnB1dFZhbHVlRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJsaW1pdFwifSxcInR5cGVcIjp7XCJraW5kXCI6XCJOb25OdWxsVHlwZVwiLFwidHlwZVwiOntcImtpbmRcIjpcIk5hbWVkVHlwZVwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJJbnRcIn19fSxcImRpcmVjdGl2ZXNcIjpbXX0se1wia2luZFwiOlwiSW5wdXRWYWx1ZURlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwicGFnZVwifSxcInR5cGVcIjp7XCJraW5kXCI6XCJOb25OdWxsVHlwZVwiLFwidHlwZVwiOntcImtpbmRcIjpcIk5hbWVkVHlwZVwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJJbnRcIn19fSxcImRpcmVjdGl2ZXNcIjpbXX1dLFwidHlwZVwiOntcImtpbmRcIjpcIkxpc3RUeXBlXCIsXCJ0eXBlXCI6e1wia2luZFwiOlwiTmFtZWRUeXBlXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIkJvb2tcIn19fSxcImRpcmVjdGl2ZXNcIjpbXX1dfV0sXCJsb2NcIjp7XCJzdGFydFwiOjAsXCJlbmRcIjoxNDV9fTtcbiAgICBkb2MubG9jLnNvdXJjZSA9IHtcImJvZHlcIjpcInR5cGUgQm9vayBpbXBsZW1lbnRzIE5vZGUge1xcbiAgaWQ6IElEIVxcbiAgbmFtZTogU3RyaW5nXFxuICBzeW5vcHNpczogU3RyaW5nXFxuICByYXRpbmc6IEludFxcbn1cXG5cXG50eXBlIFF1ZXJ5IHtcXG4gIGJvb2tzKGxpbWl0OiBJbnQhLCBwYWdlOiBJbnQhKTogW0Jvb2tdXFxufVxcblwiLFwibmFtZVwiOlwiR3JhcGhRTCByZXF1ZXN0XCIsXCJsb2NhdGlvbk9mZnNldFwiOntcImxpbmVcIjoxLFwiY29sdW1uXCI6MX19O1xuICBcblxuICAgIHZhciBuYW1lcyA9IHt9O1xuICAgIGZ1bmN0aW9uIHVuaXF1ZShkZWZzKSB7XG4gICAgICByZXR1cm4gZGVmcy5maWx0ZXIoXG4gICAgICAgIGZ1bmN0aW9uKGRlZikge1xuICAgICAgICAgIGlmIChkZWYua2luZCAhPT0gJ0ZyYWdtZW50RGVmaW5pdGlvbicpIHJldHVybiB0cnVlO1xuICAgICAgICAgIHZhciBuYW1lID0gZGVmLm5hbWUudmFsdWVcbiAgICAgICAgICBpZiAobmFtZXNbbmFtZV0pIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmFtZXNbbmFtZV0gPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICApXG4gICAgfVxuICBcblxuICAgICAgbW9kdWxlLmV4cG9ydHMgPSBkb2M7XG4gICAgXG4iLCJpbXBvcnQgeyBEYXRhU291cmNlIH0gZnJvbSBcImFwb2xsby1kYXRhc291cmNlXCI7XG5pbXBvcnQgQXN5bmNBaXJ0YWJsZSBmcm9tIFwiYXN5bmNhaXJ0YWJsZVwiO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcImFzeW5jYWlydGFibGUvbGliL0B0eXBlc1wiO1xuXG5pbnRlcmZhY2UgQWlydGFibGVEYXRhU291cmNlQ29uZmlnIHtcbiAgYXBpS2V5OiBzdHJpbmc7XG4gIGJhc2U6IHN0cmluZztcbiAgY29uZmlnPzogQ29uZmlnO1xufVxuXG5leHBvcnQgY2xhc3MgQWlydGFibGUgZXh0ZW5kcyBEYXRhU291cmNlIHtcbiAgcHVibGljIGFwaTogQXN5bmNBaXJ0YWJsZTtcbiAgY29uc3RydWN0b3IoY29uZmlnOiBBaXJ0YWJsZURhdGFTb3VyY2VDb25maWcpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuYXBpID0gbmV3IEFzeW5jQWlydGFibGUoY29uZmlnLmFwaUtleSwgY29uZmlnLmJhc2UpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBOb3Rpb24gfSBmcm9tIFwiLi9ub3Rpb25cIjtcbmltcG9ydCB7IEFpcnRhYmxlIH0gZnJvbSBcIi4vYWlydGFibGVcIjtcblxuZXhwb3J0IHsgQWlydGFibGUgfSBmcm9tIFwiLi9haXJ0YWJsZVwiO1xuZXhwb3J0IHsgTm90aW9uIH0gZnJvbSBcIi4vbm90aW9uXCI7XG5cbmltcG9ydCBzZWNyZXRzIGZyb20gXCIuLi9zZWNyZXRzXCI7XG5cbmV4cG9ydCB0eXBlIERhdGFTb3VyY2VzID0ge1xuICBib29rczogQWlydGFibGU7XG4gIG5vdGlvbjogTm90aW9uO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZGF0YVNvdXJjZXNGYWN0b3J5KCk6IERhdGFTb3VyY2VzIHtcbiAgcmV0dXJuIHtcbiAgICBib29rczogbmV3IEFpcnRhYmxlKHtcbiAgICAgIGFwaUtleTogc2VjcmV0cy5BSVJUQUJMRS5hcGlLZXksXG4gICAgICBiYXNlOiBzZWNyZXRzLkFJUlRBQkxFLmJvb2tzQmFzZUlkLFxuICAgIH0pLFxuICAgIG5vdGlvbjogbmV3IE5vdGlvbih7XG4gICAgICBhdXRoOiBzZWNyZXRzLk5PVElPTi5hcGlLZXksXG4gICAgfSksXG4gIH07XG59XG4iLCJpbXBvcnQgeyBDbGllbnQgfSBmcm9tIFwiQG5vdGlvbmhxL2NsaWVudFwiO1xuaW1wb3J0IHsgQ2xpZW50T3B0aW9ucyB9IGZyb20gXCJAbm90aW9uaHEvY2xpZW50L2J1aWxkL3NyYy9DbGllbnRcIjtcbmltcG9ydCB7IERhdGFTb3VyY2UgfSBmcm9tIFwiYXBvbGxvLWRhdGFzb3VyY2VcIjtcblxuZXhwb3J0IGNsYXNzIE5vdGlvbiBleHRlbmRzIERhdGFTb3VyY2Uge1xuICBwdWJsaWMgYXBpOiBDbGllbnQ7XG4gIGNvbnN0cnVjdG9yKGNvbmZpZzogQ2xpZW50T3B0aW9ucykge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5hcGkgPSBuZXcgQ2xpZW50KGNvbmZpZyk7XG4gIH1cbn1cblxuLy8gY29uc3QgeyBDbGllbnQgfSA9IHJlcXVpcmUoXCJAbm90aW9uaHEvY2xpZW50XCIpO1xuXG4vLyBjb25zdCBub3Rpb24gPSBuZXcgQ2xpZW50KHsgYXV0aDogcHJvY2Vzcy5lbnYuTk9USU9OX0FQSV9LRVkgfSk7XG5cbi8vIChhc3luYyAoKSA9PiB7XG4vLyAgIGNvbnN0IGRhdGFiYXNlSWQgPSBcIjllNjRjM2E4OWE5ZjRmODU4ZDVhYjE2NzQxMDljZjdkXCI7XG4vLyAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgbm90aW9uLmRhdGFiYXNlcy5xdWVyeSh7XG4vLyAgICAgZGF0YWJhc2VfaWQ6IGRhdGFiYXNlSWQsXG4vLyAgIH0pO1xuLy8gICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG4vLyB9KSgpO1xuIiwiaW1wb3J0IHNsdWdpZnlJdCBmcm9tIFwic2x1Z2lmeVwiO1xuZXhwb3J0IGZ1bmN0aW9uIHNsdWdpZnkodHh0OiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gc2x1Z2lmeUl0KHR4dCwgeyByZW1vdmU6IC9bKit+LigpJ1wiITpAXS9nIH0pO1xufVxuIiwiaW1wb3J0IHsgQXBvbGxvU2VydmVyIH0gZnJvbSBcImFwb2xsby1zZXJ2ZXJcIjtcbmltcG9ydCB7IGNyZWF0ZUFwcGxpY2F0aW9uIH0gZnJvbSBcImdyYXBocWwtbW9kdWxlc1wiO1xuaW1wb3J0IHsgQXBvbGxvU2VydmVyUGx1Z2luVXNhZ2VSZXBvcnRpbmdEaXNhYmxlZCB9IGZyb20gXCJhcG9sbG8tc2VydmVyLWNvcmVcIjtcblxuaW1wb3J0IGRhdGFTb3VyY2VzRmFjdG9yeSBmcm9tIFwiLi9kYXRhU291cmNlc1wiO1xuXG5pbXBvcnQgYm9va3MgZnJvbSBcIi4vYm9va3MvaW5kZXhcIjtcbmltcG9ydCBwcm9qZWN0cyBmcm9tIFwiLi9wcm9qZWN0cy9pbmRleFwiO1xuXG5jb25zdCBhcHAgPSBjcmVhdGVBcHBsaWNhdGlvbih7XG4gIG1vZHVsZXM6IFtib29rcywgcHJvamVjdHNdLFxufSk7XG5cbmNvbnN0IHNjaGVtYSA9IGFwcC5jcmVhdGVTY2hlbWFGb3JBcG9sbG8oKTtcbmNvbnN0IHNlcnZlciA9IG5ldyBBcG9sbG9TZXJ2ZXIoe1xuICBzY2hlbWEsXG4gIGRhdGFTb3VyY2VzOiBkYXRhU291cmNlc0ZhY3RvcnksXG4gIHRyYWNpbmc6IHRydWUsXG4gIHBsdWdpbnM6IFtBcG9sbG9TZXJ2ZXJQbHVnaW5Vc2FnZVJlcG9ydGluZ0Rpc2FibGVkKCldLFxufSk7XG5cbi8vIFRoZSBgbGlzdGVuYCBtZXRob2QgbGF1bmNoZXMgYSB3ZWIgc2VydmVyLlxuc2VydmVyLmxpc3RlbigpLnRoZW4oKHsgdXJsIH0pID0+IHtcbiAgY29uc29sZS5sb2coYPCfmoAgIFNlcnZlciByZWFkeSBhdCAke3VybH1gKTtcbn0pO1xuXG5pZiAobW9kdWxlLmhvdCkge1xuICBtb2R1bGUuaG90LmFjY2VwdCgpO1xuICBtb2R1bGUuaG90LmRpc3Bvc2UoKCkgPT4gbnVsbCk7XG59XG4iLCJcbiAgICB2YXIgZG9jID0ge1wia2luZFwiOlwiRG9jdW1lbnRcIixcImRlZmluaXRpb25zXCI6W3tcImtpbmRcIjpcIkVudW1UeXBlRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJSaWNoVGV4dFR5cGVFbnVtXCJ9LFwiZGlyZWN0aXZlc1wiOltdLFwidmFsdWVzXCI6W3tcImtpbmRcIjpcIkVudW1WYWx1ZURlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwidGV4dFwifSxcImRpcmVjdGl2ZXNcIjpbXX0se1wia2luZFwiOlwiRW51bVZhbHVlRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJtZW50aW9uXCJ9LFwiZGlyZWN0aXZlc1wiOltdfSx7XCJraW5kXCI6XCJFbnVtVmFsdWVEZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcImVxdWF0aW9uXCJ9LFwiZGlyZWN0aXZlc1wiOltdfV19LHtcImtpbmRcIjpcIkVudW1UeXBlRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJQcm9wZXJ0eVR5cGVFbnVtXCJ9LFwiZGlyZWN0aXZlc1wiOltdLFwidmFsdWVzXCI6W3tcImtpbmRcIjpcIkVudW1WYWx1ZURlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwidGl0bGVcIn0sXCJkaXJlY3RpdmVzXCI6W119LHtcImtpbmRcIjpcIkVudW1WYWx1ZURlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwicmljaF90ZXh0XCJ9LFwiZGlyZWN0aXZlc1wiOltdfSx7XCJraW5kXCI6XCJFbnVtVmFsdWVEZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIm51bWJlclwifSxcImRpcmVjdGl2ZXNcIjpbXX0se1wia2luZFwiOlwiRW51bVZhbHVlRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJzZWxlY3RcIn0sXCJkaXJlY3RpdmVzXCI6W119LHtcImtpbmRcIjpcIkVudW1WYWx1ZURlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwibXVsdGlfc2VsZWN0XCJ9LFwiZGlyZWN0aXZlc1wiOltdfSx7XCJraW5kXCI6XCJFbnVtVmFsdWVEZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcImRhdGVcIn0sXCJkaXJlY3RpdmVzXCI6W119LHtcImtpbmRcIjpcIkVudW1WYWx1ZURlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwicGVvcGxlXCJ9LFwiZGlyZWN0aXZlc1wiOltdfSx7XCJraW5kXCI6XCJFbnVtVmFsdWVEZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcImZpbGVcIn0sXCJkaXJlY3RpdmVzXCI6W119LHtcImtpbmRcIjpcIkVudW1WYWx1ZURlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiY2hlY2tib3hcIn0sXCJkaXJlY3RpdmVzXCI6W119LHtcImtpbmRcIjpcIkVudW1WYWx1ZURlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwidXJsXCJ9LFwiZGlyZWN0aXZlc1wiOltdfSx7XCJraW5kXCI6XCJFbnVtVmFsdWVEZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcImVtYWlsXCJ9LFwiZGlyZWN0aXZlc1wiOltdfSx7XCJraW5kXCI6XCJFbnVtVmFsdWVEZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcInBob25lX251bWJlclwifSxcImRpcmVjdGl2ZXNcIjpbXX0se1wia2luZFwiOlwiRW51bVZhbHVlRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJmb3JtdWxhXCJ9LFwiZGlyZWN0aXZlc1wiOltdfSx7XCJraW5kXCI6XCJFbnVtVmFsdWVEZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcInJlbGF0aW9uXCJ9LFwiZGlyZWN0aXZlc1wiOltdfSx7XCJraW5kXCI6XCJFbnVtVmFsdWVEZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcInJvbGx1cFwifSxcImRpcmVjdGl2ZXNcIjpbXX0se1wia2luZFwiOlwiRW51bVZhbHVlRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJjcmVhdGVkX3RpbWVcIn0sXCJkaXJlY3RpdmVzXCI6W119LHtcImtpbmRcIjpcIkVudW1WYWx1ZURlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiY3JlYXRlZF9ieVwifSxcImRpcmVjdGl2ZXNcIjpbXX0se1wia2luZFwiOlwiRW51bVZhbHVlRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJsYXN0X2VkaXRlZF90aW1lXCJ9LFwiZGlyZWN0aXZlc1wiOltdfSx7XCJraW5kXCI6XCJFbnVtVmFsdWVEZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcImxhc3RfZWRpdGVkX2J5XCJ9LFwiZGlyZWN0aXZlc1wiOltdfV19LHtcImtpbmRcIjpcIkVudW1UeXBlRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJOdW1iZXJGb3JtYXRFbnVtXCJ9LFwiZGlyZWN0aXZlc1wiOltdLFwidmFsdWVzXCI6W3tcImtpbmRcIjpcIkVudW1WYWx1ZURlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiTlVNQkVSXCJ9LFwiZGlyZWN0aXZlc1wiOltdfSx7XCJraW5kXCI6XCJFbnVtVmFsdWVEZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIk5VTUJFUl9XSVRIX0NPTU1BU1wifSxcImRpcmVjdGl2ZXNcIjpbXX0se1wia2luZFwiOlwiRW51bVZhbHVlRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJQRVJDRU5UXCJ9LFwiZGlyZWN0aXZlc1wiOltdfSx7XCJraW5kXCI6XCJFbnVtVmFsdWVEZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIkRPTExBUlwifSxcImRpcmVjdGl2ZXNcIjpbXX0se1wia2luZFwiOlwiRW51bVZhbHVlRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJFVVJPXCJ9LFwiZGlyZWN0aXZlc1wiOltdfSx7XCJraW5kXCI6XCJFbnVtVmFsdWVEZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIlBPVU5EXCJ9LFwiZGlyZWN0aXZlc1wiOltdfSx7XCJraW5kXCI6XCJFbnVtVmFsdWVEZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIllFTlwifSxcImRpcmVjdGl2ZXNcIjpbXX0se1wia2luZFwiOlwiRW51bVZhbHVlRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJSVUJCTEVcIn0sXCJkaXJlY3RpdmVzXCI6W119LHtcImtpbmRcIjpcIkVudW1WYWx1ZURlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiUlVQRUVcIn0sXCJkaXJlY3RpdmVzXCI6W119LHtcImtpbmRcIjpcIkVudW1WYWx1ZURlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiV09OXCJ9LFwiZGlyZWN0aXZlc1wiOltdfSx7XCJraW5kXCI6XCJFbnVtVmFsdWVEZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIllVQU5cIn0sXCJkaXJlY3RpdmVzXCI6W119XX0se1wia2luZFwiOlwiSW50ZXJmYWNlVHlwZURlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiTm90aW9uUGFyZW50Tm9kZVwifSxcImludGVyZmFjZXNcIjpbXSxcImRpcmVjdGl2ZXNcIjpbXSxcImZpZWxkc1wiOlt7XCJraW5kXCI6XCJGaWVsZERlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwidHlwZVwifSxcImFyZ3VtZW50c1wiOltdLFwidHlwZVwiOntcImtpbmRcIjpcIk5hbWVkVHlwZVwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJTdHJpbmdcIn19LFwiZGlyZWN0aXZlc1wiOltdfSx7XCJraW5kXCI6XCJGaWVsZERlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiZGF0YWJhc2VfaWRcIn0sXCJhcmd1bWVudHNcIjpbXSxcInR5cGVcIjp7XCJraW5kXCI6XCJOYW1lZFR5cGVcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiU3RyaW5nXCJ9fSxcImRpcmVjdGl2ZXNcIjpbXX1dfSx7XCJraW5kXCI6XCJJbnRlcmZhY2VUeXBlRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJOb3Rpb25QYWdlXCJ9LFwiaW50ZXJmYWNlc1wiOlt7XCJraW5kXCI6XCJOYW1lZFR5cGVcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiTm9kZVwifX1dLFwiZGlyZWN0aXZlc1wiOltdLFwiZmllbGRzXCI6W3tcImtpbmRcIjpcIkZpZWxkRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJpZFwifSxcImFyZ3VtZW50c1wiOltdLFwidHlwZVwiOntcImtpbmRcIjpcIk5vbk51bGxUeXBlXCIsXCJ0eXBlXCI6e1wia2luZFwiOlwiTmFtZWRUeXBlXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIklEXCJ9fX0sXCJkaXJlY3RpdmVzXCI6W119LHtcImtpbmRcIjpcIkZpZWxkRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJvYmplY3RcIn0sXCJhcmd1bWVudHNcIjpbXSxcInR5cGVcIjp7XCJraW5kXCI6XCJOYW1lZFR5cGVcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiU3RyaW5nXCJ9fSxcImRpcmVjdGl2ZXNcIjpbXX0se1wia2luZFwiOlwiRmllbGREZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcInVybFwifSxcImFyZ3VtZW50c1wiOltdLFwidHlwZVwiOntcImtpbmRcIjpcIk5hbWVkVHlwZVwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJTdHJpbmdcIn19LFwiZGlyZWN0aXZlc1wiOltdfSx7XCJraW5kXCI6XCJGaWVsZERlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwicGFyZW50XCJ9LFwiYXJndW1lbnRzXCI6W10sXCJ0eXBlXCI6e1wia2luZFwiOlwiTmFtZWRUeXBlXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIk5vdGlvblBhcmVudE5vZGVcIn19LFwiZGlyZWN0aXZlc1wiOltdfSx7XCJraW5kXCI6XCJGaWVsZERlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiY3JlYXRlZF90aW1lXCJ9LFwiYXJndW1lbnRzXCI6W10sXCJ0eXBlXCI6e1wia2luZFwiOlwiTmFtZWRUeXBlXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIlN0cmluZ1wifX0sXCJkaXJlY3RpdmVzXCI6W119LHtcImtpbmRcIjpcIkZpZWxkRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJsYXN0X2VkaXRlZF90aW1lXCJ9LFwiYXJndW1lbnRzXCI6W10sXCJ0eXBlXCI6e1wia2luZFwiOlwiTmFtZWRUeXBlXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIlN0cmluZ1wifX0sXCJkaXJlY3RpdmVzXCI6W119LHtcImtpbmRcIjpcIkZpZWxkRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJhcmNoaXZlZFwifSxcImFyZ3VtZW50c1wiOltdLFwidHlwZVwiOntcImtpbmRcIjpcIk5hbWVkVHlwZVwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJCb29sZWFuXCJ9fSxcImRpcmVjdGl2ZXNcIjpbXX0se1wia2luZFwiOlwiRmllbGREZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcInByb3BlcnRpZXNcIn0sXCJhcmd1bWVudHNcIjpbXSxcInR5cGVcIjp7XCJraW5kXCI6XCJMaXN0VHlwZVwiLFwidHlwZVwiOntcImtpbmRcIjpcIk5hbWVkVHlwZVwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJQcm9wZXJ0eVwifX19LFwiZGlyZWN0aXZlc1wiOltdfV19LHtcImtpbmRcIjpcIk9iamVjdFR5cGVEZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIk5vdGlvbkRhdGFiYXNlXCJ9LFwiaW50ZXJmYWNlc1wiOlt7XCJraW5kXCI6XCJOYW1lZFR5cGVcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiTm9kZVwifX1dLFwiZGlyZWN0aXZlc1wiOltdLFwiZmllbGRzXCI6W3tcImtpbmRcIjpcIkZpZWxkRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJpZFwifSxcImFyZ3VtZW50c1wiOltdLFwidHlwZVwiOntcImtpbmRcIjpcIk5vbk51bGxUeXBlXCIsXCJ0eXBlXCI6e1wia2luZFwiOlwiTmFtZWRUeXBlXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIklEXCJ9fX0sXCJkaXJlY3RpdmVzXCI6W119LHtcImtpbmRcIjpcIkZpZWxkRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJvYmplY3RcIn0sXCJhcmd1bWVudHNcIjpbXSxcInR5cGVcIjp7XCJraW5kXCI6XCJOYW1lZFR5cGVcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiU3RyaW5nXCJ9fSxcImRpcmVjdGl2ZXNcIjpbXX0se1wia2luZFwiOlwiRmllbGREZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcImNyZWF0ZWRfdGltZVwifSxcImFyZ3VtZW50c1wiOltdLFwidHlwZVwiOntcImtpbmRcIjpcIk5vbk51bGxUeXBlXCIsXCJ0eXBlXCI6e1wia2luZFwiOlwiTmFtZWRUeXBlXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIlN0cmluZ1wifX19LFwiZGlyZWN0aXZlc1wiOltdfSx7XCJraW5kXCI6XCJGaWVsZERlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwibGFzdF9lZGl0ZWRfdGltZVwifSxcImFyZ3VtZW50c1wiOltdLFwidHlwZVwiOntcImtpbmRcIjpcIk5vbk51bGxUeXBlXCIsXCJ0eXBlXCI6e1wia2luZFwiOlwiTmFtZWRUeXBlXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIlN0cmluZ1wifX19LFwiZGlyZWN0aXZlc1wiOltdfSx7XCJraW5kXCI6XCJGaWVsZERlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwidGl0bGVcIn0sXCJhcmd1bWVudHNcIjpbXSxcInR5cGVcIjp7XCJraW5kXCI6XCJMaXN0VHlwZVwiLFwidHlwZVwiOntcImtpbmRcIjpcIk5hbWVkVHlwZVwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJSaWNoVGV4dFwifX19LFwiZGlyZWN0aXZlc1wiOltdfSx7XCJraW5kXCI6XCJGaWVsZERlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwicHJvcGVydGllc1wifSxcImFyZ3VtZW50c1wiOltdLFwidHlwZVwiOntcImtpbmRcIjpcIk5hbWVkVHlwZVwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJKU09OT2JqZWN0XCJ9fSxcImRpcmVjdGl2ZXNcIjpbXX1dfSx7XCJraW5kXCI6XCJJbnRlcmZhY2VUeXBlRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJQcm9wZXJ0eVwifSxcImludGVyZmFjZXNcIjpbe1wia2luZFwiOlwiTmFtZWRUeXBlXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIk5vZGVcIn19XSxcImRpcmVjdGl2ZXNcIjpbXSxcImZpZWxkc1wiOlt7XCJraW5kXCI6XCJGaWVsZERlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiaWRcIn0sXCJhcmd1bWVudHNcIjpbXSxcInR5cGVcIjp7XCJraW5kXCI6XCJOb25OdWxsVHlwZVwiLFwidHlwZVwiOntcImtpbmRcIjpcIk5hbWVkVHlwZVwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJJRFwifX19LFwiZGlyZWN0aXZlc1wiOltdfSx7XCJraW5kXCI6XCJGaWVsZERlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwidHlwZVwifSxcImFyZ3VtZW50c1wiOltdLFwidHlwZVwiOntcImtpbmRcIjpcIk5hbWVkVHlwZVwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJQcm9wZXJ0eVR5cGVFbnVtXCJ9fSxcImRpcmVjdGl2ZXNcIjpbXX0se1wia2luZFwiOlwiRmllbGREZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIm5hbWVcIn0sXCJhcmd1bWVudHNcIjpbXSxcInR5cGVcIjp7XCJraW5kXCI6XCJOb25OdWxsVHlwZVwiLFwidHlwZVwiOntcImtpbmRcIjpcIk5hbWVkVHlwZVwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJTdHJpbmdcIn19fSxcImRpcmVjdGl2ZXNcIjpbXX1dfSx7XCJraW5kXCI6XCJPYmplY3RUeXBlRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJQcm9wZXJ0eVRpdGxlXCJ9LFwiaW50ZXJmYWNlc1wiOlt7XCJraW5kXCI6XCJOYW1lZFR5cGVcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiUHJvcGVydHlcIn19LHtcImtpbmRcIjpcIk5hbWVkVHlwZVwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJOb2RlXCJ9fV0sXCJkaXJlY3RpdmVzXCI6W10sXCJmaWVsZHNcIjpbe1wia2luZFwiOlwiRmllbGREZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcImlkXCJ9LFwiYXJndW1lbnRzXCI6W10sXCJ0eXBlXCI6e1wia2luZFwiOlwiTm9uTnVsbFR5cGVcIixcInR5cGVcIjp7XCJraW5kXCI6XCJOYW1lZFR5cGVcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiSURcIn19fSxcImRpcmVjdGl2ZXNcIjpbXX0se1wia2luZFwiOlwiRmllbGREZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcInR5cGVcIn0sXCJhcmd1bWVudHNcIjpbXSxcInR5cGVcIjp7XCJraW5kXCI6XCJOYW1lZFR5cGVcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiUHJvcGVydHlUeXBlRW51bVwifX0sXCJkaXJlY3RpdmVzXCI6W119LHtcImtpbmRcIjpcIkZpZWxkRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJuYW1lXCJ9LFwiYXJndW1lbnRzXCI6W10sXCJ0eXBlXCI6e1wia2luZFwiOlwiTm9uTnVsbFR5cGVcIixcInR5cGVcIjp7XCJraW5kXCI6XCJOYW1lZFR5cGVcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiU3RyaW5nXCJ9fX0sXCJkaXJlY3RpdmVzXCI6W119LHtcImtpbmRcIjpcIkZpZWxkRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJ0aXRsZVwifSxcImFyZ3VtZW50c1wiOltdLFwidHlwZVwiOntcImtpbmRcIjpcIkxpc3RUeXBlXCIsXCJ0eXBlXCI6e1wia2luZFwiOlwiTmFtZWRUeXBlXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIlJpY2hUZXh0XCJ9fX0sXCJkaXJlY3RpdmVzXCI6W119XX0se1wia2luZFwiOlwiT2JqZWN0VHlwZURlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiUHJvcGVydHlSaWNoVGV4dFwifSxcImludGVyZmFjZXNcIjpbe1wia2luZFwiOlwiTmFtZWRUeXBlXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIlByb3BlcnR5XCJ9fSx7XCJraW5kXCI6XCJOYW1lZFR5cGVcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiTm9kZVwifX1dLFwiZGlyZWN0aXZlc1wiOltdLFwiZmllbGRzXCI6W3tcImtpbmRcIjpcIkZpZWxkRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJpZFwifSxcImFyZ3VtZW50c1wiOltdLFwidHlwZVwiOntcImtpbmRcIjpcIk5vbk51bGxUeXBlXCIsXCJ0eXBlXCI6e1wia2luZFwiOlwiTmFtZWRUeXBlXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIklEXCJ9fX0sXCJkaXJlY3RpdmVzXCI6W119LHtcImtpbmRcIjpcIkZpZWxkRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJ0eXBlXCJ9LFwiYXJndW1lbnRzXCI6W10sXCJ0eXBlXCI6e1wia2luZFwiOlwiTmFtZWRUeXBlXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIlByb3BlcnR5VHlwZUVudW1cIn19LFwiZGlyZWN0aXZlc1wiOltdfSx7XCJraW5kXCI6XCJGaWVsZERlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwibmFtZVwifSxcImFyZ3VtZW50c1wiOltdLFwidHlwZVwiOntcImtpbmRcIjpcIk5vbk51bGxUeXBlXCIsXCJ0eXBlXCI6e1wia2luZFwiOlwiTmFtZWRUeXBlXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIlN0cmluZ1wifX19LFwiZGlyZWN0aXZlc1wiOltdfSx7XCJraW5kXCI6XCJGaWVsZERlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwicmljaF90ZXh0XCJ9LFwiYXJndW1lbnRzXCI6W10sXCJ0eXBlXCI6e1wia2luZFwiOlwiTGlzdFR5cGVcIixcInR5cGVcIjp7XCJraW5kXCI6XCJOYW1lZFR5cGVcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiUmljaFRleHRcIn19fSxcImRpcmVjdGl2ZXNcIjpbXX1dfSx7XCJraW5kXCI6XCJPYmplY3RUeXBlRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJQcm9wZXJ0eU11bHRpU2VsZWN0XCJ9LFwiaW50ZXJmYWNlc1wiOlt7XCJraW5kXCI6XCJOYW1lZFR5cGVcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiUHJvcGVydHlcIn19LHtcImtpbmRcIjpcIk5hbWVkVHlwZVwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJOb2RlXCJ9fV0sXCJkaXJlY3RpdmVzXCI6W10sXCJmaWVsZHNcIjpbe1wia2luZFwiOlwiRmllbGREZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcImlkXCJ9LFwiYXJndW1lbnRzXCI6W10sXCJ0eXBlXCI6e1wia2luZFwiOlwiTm9uTnVsbFR5cGVcIixcInR5cGVcIjp7XCJraW5kXCI6XCJOYW1lZFR5cGVcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiSURcIn19fSxcImRpcmVjdGl2ZXNcIjpbXX0se1wia2luZFwiOlwiRmllbGREZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcInR5cGVcIn0sXCJhcmd1bWVudHNcIjpbXSxcInR5cGVcIjp7XCJraW5kXCI6XCJOYW1lZFR5cGVcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiUHJvcGVydHlUeXBlRW51bVwifX0sXCJkaXJlY3RpdmVzXCI6W119LHtcImtpbmRcIjpcIkZpZWxkRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJuYW1lXCJ9LFwiYXJndW1lbnRzXCI6W10sXCJ0eXBlXCI6e1wia2luZFwiOlwiTm9uTnVsbFR5cGVcIixcInR5cGVcIjp7XCJraW5kXCI6XCJOYW1lZFR5cGVcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiU3RyaW5nXCJ9fX0sXCJkaXJlY3RpdmVzXCI6W119LHtcImtpbmRcIjpcIkZpZWxkRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJtdWx0aV9zZWxlY3RcIn0sXCJhcmd1bWVudHNcIjpbXSxcInR5cGVcIjp7XCJraW5kXCI6XCJMaXN0VHlwZVwiLFwidHlwZVwiOntcImtpbmRcIjpcIk5hbWVkVHlwZVwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJNdWx0aVNlbGVjdE9wdGlvbkl0ZW1cIn19fSxcImRpcmVjdGl2ZXNcIjpbXX1dfSx7XCJraW5kXCI6XCJPYmplY3RUeXBlRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJQcm9wZXJ0eUNoZWNrYm94XCJ9LFwiaW50ZXJmYWNlc1wiOlt7XCJraW5kXCI6XCJOYW1lZFR5cGVcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiUHJvcGVydHlcIn19LHtcImtpbmRcIjpcIk5hbWVkVHlwZVwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJOb2RlXCJ9fV0sXCJkaXJlY3RpdmVzXCI6W10sXCJmaWVsZHNcIjpbe1wia2luZFwiOlwiRmllbGREZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcImlkXCJ9LFwiYXJndW1lbnRzXCI6W10sXCJ0eXBlXCI6e1wia2luZFwiOlwiTm9uTnVsbFR5cGVcIixcInR5cGVcIjp7XCJraW5kXCI6XCJOYW1lZFR5cGVcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiSURcIn19fSxcImRpcmVjdGl2ZXNcIjpbXX0se1wia2luZFwiOlwiRmllbGREZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcInR5cGVcIn0sXCJhcmd1bWVudHNcIjpbXSxcInR5cGVcIjp7XCJraW5kXCI6XCJOYW1lZFR5cGVcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiUHJvcGVydHlUeXBlRW51bVwifX0sXCJkaXJlY3RpdmVzXCI6W119LHtcImtpbmRcIjpcIkZpZWxkRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJuYW1lXCJ9LFwiYXJndW1lbnRzXCI6W10sXCJ0eXBlXCI6e1wia2luZFwiOlwiTm9uTnVsbFR5cGVcIixcInR5cGVcIjp7XCJraW5kXCI6XCJOYW1lZFR5cGVcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiU3RyaW5nXCJ9fX0sXCJkaXJlY3RpdmVzXCI6W119LHtcImtpbmRcIjpcIkZpZWxkRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJjaGVja2JveFwifSxcImFyZ3VtZW50c1wiOltdLFwidHlwZVwiOntcImtpbmRcIjpcIk5hbWVkVHlwZVwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJCb29sZWFuXCJ9fSxcImRpcmVjdGl2ZXNcIjpbXX1dfSx7XCJraW5kXCI6XCJPYmplY3RUeXBlRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJUZXh0QW5ub3RhdGlvbnNcIn0sXCJpbnRlcmZhY2VzXCI6W10sXCJkaXJlY3RpdmVzXCI6W10sXCJmaWVsZHNcIjpbe1wia2luZFwiOlwiRmllbGREZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcImJvbGRcIn0sXCJhcmd1bWVudHNcIjpbXSxcInR5cGVcIjp7XCJraW5kXCI6XCJOYW1lZFR5cGVcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiQm9vbGVhblwifX0sXCJkaXJlY3RpdmVzXCI6W119LHtcImtpbmRcIjpcIkZpZWxkRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJpdGFsaWNcIn0sXCJhcmd1bWVudHNcIjpbXSxcInR5cGVcIjp7XCJraW5kXCI6XCJOYW1lZFR5cGVcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiQm9vbGVhblwifX0sXCJkaXJlY3RpdmVzXCI6W119LHtcImtpbmRcIjpcIkZpZWxkRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJzdHJpa2V0aHJvdWdoXCJ9LFwiYXJndW1lbnRzXCI6W10sXCJ0eXBlXCI6e1wia2luZFwiOlwiTmFtZWRUeXBlXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIkJvb2xlYW5cIn19LFwiZGlyZWN0aXZlc1wiOltdfSx7XCJraW5kXCI6XCJGaWVsZERlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwidW5kZXJsaW5lXCJ9LFwiYXJndW1lbnRzXCI6W10sXCJ0eXBlXCI6e1wia2luZFwiOlwiTmFtZWRUeXBlXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIkJvb2xlYW5cIn19LFwiZGlyZWN0aXZlc1wiOltdfSx7XCJraW5kXCI6XCJGaWVsZERlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiY29kZVwifSxcImFyZ3VtZW50c1wiOltdLFwidHlwZVwiOntcImtpbmRcIjpcIk5hbWVkVHlwZVwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJCb29sZWFuXCJ9fSxcImRpcmVjdGl2ZXNcIjpbXX0se1wia2luZFwiOlwiRmllbGREZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcImNvbG9yXCJ9LFwiYXJndW1lbnRzXCI6W10sXCJ0eXBlXCI6e1wia2luZFwiOlwiTmFtZWRUeXBlXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIlN0cmluZ1wifX0sXCJkaXJlY3RpdmVzXCI6W119XX0se1wia2luZFwiOlwiRnJhZ21lbnREZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIlRleHRBbm5vdGF0aW9uc0ZyYWdtZW50XCJ9LFwidHlwZUNvbmRpdGlvblwiOntcImtpbmRcIjpcIk5hbWVkVHlwZVwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJUZXh0QW5ub3RhdGlvbnNcIn19LFwiZGlyZWN0aXZlc1wiOltdLFwic2VsZWN0aW9uU2V0XCI6e1wia2luZFwiOlwiU2VsZWN0aW9uU2V0XCIsXCJzZWxlY3Rpb25zXCI6W3tcImtpbmRcIjpcIkZpZWxkXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcImJvbGRcIn0sXCJhcmd1bWVudHNcIjpbXSxcImRpcmVjdGl2ZXNcIjpbXX0se1wia2luZFwiOlwiRmllbGRcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiaXRhbGljXCJ9LFwiYXJndW1lbnRzXCI6W10sXCJkaXJlY3RpdmVzXCI6W119LHtcImtpbmRcIjpcIkZpZWxkXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcInN0cmlrZXRocm91Z2hcIn0sXCJhcmd1bWVudHNcIjpbXSxcImRpcmVjdGl2ZXNcIjpbXX0se1wia2luZFwiOlwiRmllbGRcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwidW5kZXJsaW5lXCJ9LFwiYXJndW1lbnRzXCI6W10sXCJkaXJlY3RpdmVzXCI6W119LHtcImtpbmRcIjpcIkZpZWxkXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcImNvZGVcIn0sXCJhcmd1bWVudHNcIjpbXSxcImRpcmVjdGl2ZXNcIjpbXX0se1wia2luZFwiOlwiRmllbGRcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiY29sb3JcIn0sXCJhcmd1bWVudHNcIjpbXSxcImRpcmVjdGl2ZXNcIjpbXX1dfX0se1wia2luZFwiOlwiT2JqZWN0VHlwZURlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiVGV4dFwifSxcImludGVyZmFjZXNcIjpbXSxcImRpcmVjdGl2ZXNcIjpbXSxcImZpZWxkc1wiOlt7XCJraW5kXCI6XCJGaWVsZERlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwidHlwZVwifSxcImFyZ3VtZW50c1wiOltdLFwidHlwZVwiOntcImtpbmRcIjpcIk5hbWVkVHlwZVwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJSaWNoVGV4dFR5cGVFbnVtXCJ9fSxcImRpcmVjdGl2ZXNcIjpbXX0se1wia2luZFwiOlwiRmllbGREZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcImNvbnRlbnRcIn0sXCJhcmd1bWVudHNcIjpbXSxcInR5cGVcIjp7XCJraW5kXCI6XCJOYW1lZFR5cGVcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiU3RyaW5nXCJ9fSxcImRpcmVjdGl2ZXNcIjpbXX0se1wia2luZFwiOlwiRmllbGREZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcImxpbmtcIn0sXCJhcmd1bWVudHNcIjpbXSxcInR5cGVcIjp7XCJraW5kXCI6XCJOYW1lZFR5cGVcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiU3RyaW5nXCJ9fSxcImRpcmVjdGl2ZXNcIjpbXX1dfSx7XCJraW5kXCI6XCJPYmplY3RUeXBlRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJSaWNoVGV4dFwifSxcImludGVyZmFjZXNcIjpbXSxcImRpcmVjdGl2ZXNcIjpbXSxcImZpZWxkc1wiOlt7XCJraW5kXCI6XCJGaWVsZERlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwidHlwZVwifSxcImFyZ3VtZW50c1wiOltdLFwidHlwZVwiOntcImtpbmRcIjpcIk5vbk51bGxUeXBlXCIsXCJ0eXBlXCI6e1wia2luZFwiOlwiTmFtZWRUeXBlXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIlJpY2hUZXh0VHlwZUVudW1cIn19fSxcImRpcmVjdGl2ZXNcIjpbXX0se1wia2luZFwiOlwiRmllbGREZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcInBsYWluX3RleHRcIn0sXCJhcmd1bWVudHNcIjpbXSxcInR5cGVcIjp7XCJraW5kXCI6XCJOb25OdWxsVHlwZVwiLFwidHlwZVwiOntcImtpbmRcIjpcIk5hbWVkVHlwZVwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJTdHJpbmdcIn19fSxcImRpcmVjdGl2ZXNcIjpbXX0se1wia2luZFwiOlwiRmllbGREZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcImhyZWZcIn0sXCJhcmd1bWVudHNcIjpbXSxcInR5cGVcIjp7XCJraW5kXCI6XCJOYW1lZFR5cGVcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiU3RyaW5nXCJ9fSxcImRpcmVjdGl2ZXNcIjpbXX0se1wia2luZFwiOlwiRmllbGREZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcImFubm90YXRpb25zXCJ9LFwiYXJndW1lbnRzXCI6W10sXCJ0eXBlXCI6e1wia2luZFwiOlwiTmFtZWRUeXBlXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIlRleHRBbm5vdGF0aW9uc1wifX0sXCJkaXJlY3RpdmVzXCI6W119XX0se1wia2luZFwiOlwiT2JqZWN0VHlwZURlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiTXVsdGlTZWxlY3RPcHRpb25JdGVtXCJ9LFwiaW50ZXJmYWNlc1wiOltdLFwiZGlyZWN0aXZlc1wiOltdLFwiZmllbGRzXCI6W3tcImtpbmRcIjpcIkZpZWxkRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJpZFwifSxcImFyZ3VtZW50c1wiOltdLFwidHlwZVwiOntcImtpbmRcIjpcIk5vbk51bGxUeXBlXCIsXCJ0eXBlXCI6e1wia2luZFwiOlwiTmFtZWRUeXBlXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIklEXCJ9fX0sXCJkaXJlY3RpdmVzXCI6W119LHtcImtpbmRcIjpcIkZpZWxkRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJuYW1lXCJ9LFwiYXJndW1lbnRzXCI6W10sXCJ0eXBlXCI6e1wia2luZFwiOlwiTmFtZWRUeXBlXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIlN0cmluZ1wifX0sXCJkaXJlY3RpdmVzXCI6W119LHtcImtpbmRcIjpcIkZpZWxkRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJjb2xvclwifSxcImFyZ3VtZW50c1wiOltdLFwidHlwZVwiOntcImtpbmRcIjpcIk5hbWVkVHlwZVwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJTdHJpbmdcIn19LFwiZGlyZWN0aXZlc1wiOltdfV19LHtcImtpbmRcIjpcIlVuaW9uVHlwZURlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiQW55VGV4dFwifSxcImRpcmVjdGl2ZXNcIjpbXSxcInR5cGVzXCI6W3tcImtpbmRcIjpcIk5hbWVkVHlwZVwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJUZXh0XCJ9fSx7XCJraW5kXCI6XCJOYW1lZFR5cGVcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiUmljaFRleHRcIn19XX0se1wia2luZFwiOlwiT2JqZWN0VHlwZURlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiTnVtYmVyXCJ9LFwiaW50ZXJmYWNlc1wiOltdLFwiZGlyZWN0aXZlc1wiOltdLFwiZmllbGRzXCI6W3tcImtpbmRcIjpcIkZpZWxkRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJmb3JtYXRcIn0sXCJhcmd1bWVudHNcIjpbXSxcInR5cGVcIjp7XCJraW5kXCI6XCJOYW1lZFR5cGVcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiU3RyaW5nXCJ9fSxcImRpcmVjdGl2ZXNcIjpbXX1dfV0sXCJsb2NcIjp7XCJzdGFydFwiOjAsXCJlbmRcIjoyMTYzfX07XG4gICAgZG9jLmxvYy5zb3VyY2UgPSB7XCJib2R5XCI6XCIjaW1wb3J0IFxcXCIuLi90eXBlcy5ncmFwaHFsXFxcIlxcbiNpbXBvcnQgXFxcIi4vc29ydC5ncmFwaHFsXFxcIlxcblxcbmVudW0gUmljaFRleHRUeXBlRW51bSB7XFxuICB0ZXh0XFxuICBtZW50aW9uXFxuICBlcXVhdGlvblxcbn1cXG5cXG5lbnVtIFByb3BlcnR5VHlwZUVudW0ge1xcbiAgdGl0bGVcXG4gIHJpY2hfdGV4dFxcbiAgbnVtYmVyXFxuICBzZWxlY3RcXG4gIG11bHRpX3NlbGVjdFxcbiAgZGF0ZVxcbiAgcGVvcGxlXFxuICBmaWxlXFxuICBjaGVja2JveFxcbiAgdXJsXFxuICBlbWFpbFxcbiAgcGhvbmVfbnVtYmVyXFxuICBmb3JtdWxhXFxuICByZWxhdGlvblxcbiAgcm9sbHVwXFxuICBjcmVhdGVkX3RpbWVcXG4gIGNyZWF0ZWRfYnlcXG4gIGxhc3RfZWRpdGVkX3RpbWVcXG4gIGxhc3RfZWRpdGVkX2J5XFxufVxcblxcbmVudW0gTnVtYmVyRm9ybWF0RW51bSB7XFxuICBOVU1CRVJcXG4gIE5VTUJFUl9XSVRIX0NPTU1BU1xcbiAgUEVSQ0VOVFxcbiAgRE9MTEFSXFxuICBFVVJPXFxuICBQT1VORFxcbiAgWUVOXFxuICBSVUJCTEVcXG4gIFJVUEVFXFxuICBXT05cXG4gIFlVQU5cXG59XFxuXFxuIyMjIyMjIyMjIyMjIyMjXFxuXFxuaW50ZXJmYWNlIE5vdGlvblBhcmVudE5vZGUge1xcbiAgdHlwZTogU3RyaW5nXFxuICBkYXRhYmFzZV9pZDogU3RyaW5nXFxufVxcblxcbmludGVyZmFjZSBOb3Rpb25QYWdlIGltcGxlbWVudHMgTm9kZSB7XFxuICBpZDogSUQhXFxuICBvYmplY3Q6IFN0cmluZ1xcbiAgdXJsOiBTdHJpbmdcXG4gIHBhcmVudDogTm90aW9uUGFyZW50Tm9kZVxcbiAgY3JlYXRlZF90aW1lOiBTdHJpbmdcXG4gIGxhc3RfZWRpdGVkX3RpbWU6IFN0cmluZ1xcbiAgYXJjaGl2ZWQ6IEJvb2xlYW5cXG4gIHByb3BlcnRpZXM6IFtQcm9wZXJ0eV1cXG59XFxuXFxudHlwZSBOb3Rpb25EYXRhYmFzZSBpbXBsZW1lbnRzIE5vZGUge1xcbiAgaWQ6IElEIVxcbiAgb2JqZWN0OiBTdHJpbmdcXG4gIGNyZWF0ZWRfdGltZTogU3RyaW5nIVxcbiAgbGFzdF9lZGl0ZWRfdGltZTogU3RyaW5nIVxcbiAgdGl0bGU6IFtSaWNoVGV4dF1cXG4gIHByb3BlcnRpZXM6IEpTT05PYmplY3RcXG59XFxuXFxuIyMjIyMjIyMjIyMjIyMjXFxuXFxuaW50ZXJmYWNlIFByb3BlcnR5IGltcGxlbWVudHMgTm9kZSB7XFxuICBpZDogSUQhXFxuICB0eXBlOiBQcm9wZXJ0eVR5cGVFbnVtXFxuICBuYW1lOiBTdHJpbmchXFxufVxcblxcbnR5cGUgUHJvcGVydHlUaXRsZSBpbXBsZW1lbnRzIFByb3BlcnR5ICYgTm9kZSB7XFxuICBpZDogSUQhXFxuICB0eXBlOiBQcm9wZXJ0eVR5cGVFbnVtXFxuICBuYW1lOiBTdHJpbmchXFxuICB0aXRsZTogW1JpY2hUZXh0XVxcbn1cXG5cXG50eXBlIFByb3BlcnR5UmljaFRleHQgaW1wbGVtZW50cyBQcm9wZXJ0eSAmIE5vZGUge1xcbiAgaWQ6IElEIVxcbiAgdHlwZTogUHJvcGVydHlUeXBlRW51bVxcbiAgbmFtZTogU3RyaW5nIVxcbiAgcmljaF90ZXh0OiBbUmljaFRleHRdXFxufVxcblxcbnR5cGUgUHJvcGVydHlNdWx0aVNlbGVjdCBpbXBsZW1lbnRzIFByb3BlcnR5ICYgTm9kZSB7XFxuICBpZDogSUQhXFxuICB0eXBlOiBQcm9wZXJ0eVR5cGVFbnVtXFxuICBuYW1lOiBTdHJpbmchXFxuICBtdWx0aV9zZWxlY3Q6IFtNdWx0aVNlbGVjdE9wdGlvbkl0ZW1dXFxufVxcblxcbnR5cGUgUHJvcGVydHlDaGVja2JveCBpbXBsZW1lbnRzIFByb3BlcnR5ICYgTm9kZSB7XFxuICBpZDogSUQhXFxuICB0eXBlOiBQcm9wZXJ0eVR5cGVFbnVtXFxuICBuYW1lOiBTdHJpbmchXFxuICBjaGVja2JveDogQm9vbGVhblxcbn1cXG5cXG4jIyMjIyMjIyMjIyMjXFxuXFxudHlwZSBUZXh0QW5ub3RhdGlvbnMge1xcbiAgYm9sZDogQm9vbGVhblxcbiAgaXRhbGljOiBCb29sZWFuXFxuICBzdHJpa2V0aHJvdWdoOiBCb29sZWFuXFxuICB1bmRlcmxpbmU6IEJvb2xlYW5cXG4gIGNvZGU6IEJvb2xlYW5cXG4gIGNvbG9yOiBTdHJpbmdcXG59XFxuZnJhZ21lbnQgVGV4dEFubm90YXRpb25zRnJhZ21lbnQgb24gVGV4dEFubm90YXRpb25zIHtcXG4gIGJvbGRcXG4gIGl0YWxpY1xcbiAgc3RyaWtldGhyb3VnaFxcbiAgdW5kZXJsaW5lXFxuICBjb2RlXFxuICBjb2xvclxcbn1cXG5cXG50eXBlIFRleHQge1xcbiAgdHlwZTogUmljaFRleHRUeXBlRW51bVxcbiAgY29udGVudDogU3RyaW5nXFxuICBsaW5rOiBTdHJpbmdcXG59XFxuXFxudHlwZSBSaWNoVGV4dCB7XFxuICB0eXBlOiBSaWNoVGV4dFR5cGVFbnVtIVxcbiAgcGxhaW5fdGV4dDogU3RyaW5nIVxcbiAgaHJlZjogU3RyaW5nXFxuICBhbm5vdGF0aW9uczogVGV4dEFubm90YXRpb25zXFxufVxcblxcbnR5cGUgTXVsdGlTZWxlY3RPcHRpb25JdGVtIHtcXG4gIGlkOiBJRCFcXG4gIG5hbWU6IFN0cmluZ1xcbiAgY29sb3I6IFN0cmluZ1xcbn1cXG5cXG51bmlvbiBBbnlUZXh0ID0gVGV4dCB8IFJpY2hUZXh0XFxuXFxuIyMjIyMjIyNcXG5cXG50eXBlIE51bWJlciB7XFxuICBmb3JtYXQ6IFN0cmluZ1xcbn1cXG5cIixcIm5hbWVcIjpcIkdyYXBoUUwgcmVxdWVzdFwiLFwibG9jYXRpb25PZmZzZXRcIjp7XCJsaW5lXCI6MSxcImNvbHVtblwiOjF9fTtcbiAgXG5cbiAgICB2YXIgbmFtZXMgPSB7fTtcbiAgICBmdW5jdGlvbiB1bmlxdWUoZGVmcykge1xuICAgICAgcmV0dXJuIGRlZnMuZmlsdGVyKFxuICAgICAgICBmdW5jdGlvbihkZWYpIHtcbiAgICAgICAgICBpZiAoZGVmLmtpbmQgIT09ICdGcmFnbWVudERlZmluaXRpb24nKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB2YXIgbmFtZSA9IGRlZi5uYW1lLnZhbHVlXG4gICAgICAgICAgaWYgKG5hbWVzW25hbWVdKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5hbWVzW25hbWVdID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgKVxuICAgIH1cbiAgZG9jLmRlZmluaXRpb25zID0gZG9jLmRlZmluaXRpb25zLmNvbmNhdCh1bmlxdWUocmVxdWlyZShcIi4uL3R5cGVzLmdyYXBocWxcIikuZGVmaW5pdGlvbnMpKTtcbmRvYy5kZWZpbml0aW9ucyA9IGRvYy5kZWZpbml0aW9ucy5jb25jYXQodW5pcXVlKHJlcXVpcmUoXCIuL3NvcnQuZ3JhcGhxbFwiKS5kZWZpbml0aW9ucykpO1xuXG5cbiAgICAvLyBDb2xsZWN0IGFueSBmcmFnbWVudC90eXBlIHJlZmVyZW5jZXMgZnJvbSBhIG5vZGUsIGFkZGluZyB0aGVtIHRvIHRoZSByZWZzIFNldFxuICAgIGZ1bmN0aW9uIGNvbGxlY3RGcmFnbWVudFJlZmVyZW5jZXMobm9kZSwgcmVmcykge1xuICAgICAgaWYgKG5vZGUua2luZCA9PT0gXCJGcmFnbWVudFNwcmVhZFwiKSB7XG4gICAgICAgIHJlZnMuYWRkKG5vZGUubmFtZS52YWx1ZSk7XG4gICAgICB9IGVsc2UgaWYgKG5vZGUua2luZCA9PT0gXCJWYXJpYWJsZURlZmluaXRpb25cIikge1xuICAgICAgICB2YXIgdHlwZSA9IG5vZGUudHlwZTtcbiAgICAgICAgaWYgKHR5cGUua2luZCA9PT0gXCJOYW1lZFR5cGVcIikge1xuICAgICAgICAgIHJlZnMuYWRkKHR5cGUubmFtZS52YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKG5vZGUuc2VsZWN0aW9uU2V0KSB7XG4gICAgICAgIG5vZGUuc2VsZWN0aW9uU2V0LnNlbGVjdGlvbnMuZm9yRWFjaChmdW5jdGlvbihzZWxlY3Rpb24pIHtcbiAgICAgICAgICBjb2xsZWN0RnJhZ21lbnRSZWZlcmVuY2VzKHNlbGVjdGlvbiwgcmVmcyk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAobm9kZS52YXJpYWJsZURlZmluaXRpb25zKSB7XG4gICAgICAgIG5vZGUudmFyaWFibGVEZWZpbml0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uKGRlZikge1xuICAgICAgICAgIGNvbGxlY3RGcmFnbWVudFJlZmVyZW5jZXMoZGVmLCByZWZzKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChub2RlLmRlZmluaXRpb25zKSB7XG4gICAgICAgIG5vZGUuZGVmaW5pdGlvbnMuZm9yRWFjaChmdW5jdGlvbihkZWYpIHtcbiAgICAgICAgICBjb2xsZWN0RnJhZ21lbnRSZWZlcmVuY2VzKGRlZiwgcmVmcyk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBkZWZpbml0aW9uUmVmcyA9IHt9O1xuICAgIChmdW5jdGlvbiBleHRyYWN0UmVmZXJlbmNlcygpIHtcbiAgICAgIGRvYy5kZWZpbml0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uKGRlZikge1xuICAgICAgICBpZiAoZGVmLm5hbWUpIHtcbiAgICAgICAgICB2YXIgcmVmcyA9IG5ldyBTZXQoKTtcbiAgICAgICAgICBjb2xsZWN0RnJhZ21lbnRSZWZlcmVuY2VzKGRlZiwgcmVmcyk7XG4gICAgICAgICAgZGVmaW5pdGlvblJlZnNbZGVmLm5hbWUudmFsdWVdID0gcmVmcztcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSkoKTtcblxuICAgIGZ1bmN0aW9uIGZpbmRPcGVyYXRpb24oZG9jLCBuYW1lKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRvYy5kZWZpbml0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgZWxlbWVudCA9IGRvYy5kZWZpbml0aW9uc1tpXTtcbiAgICAgICAgaWYgKGVsZW1lbnQubmFtZSAmJiBlbGVtZW50Lm5hbWUudmFsdWUgPT0gbmFtZSkge1xuICAgICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25lUXVlcnkoZG9jLCBvcGVyYXRpb25OYW1lKSB7XG4gICAgICAvLyBDb3B5IHRoZSBEb2N1bWVudE5vZGUsIGJ1dCBjbGVhciBvdXQgdGhlIGRlZmluaXRpb25zXG4gICAgICB2YXIgbmV3RG9jID0ge1xuICAgICAgICBraW5kOiBkb2Mua2luZCxcbiAgICAgICAgZGVmaW5pdGlvbnM6IFtmaW5kT3BlcmF0aW9uKGRvYywgb3BlcmF0aW9uTmFtZSldXG4gICAgICB9O1xuICAgICAgaWYgKGRvYy5oYXNPd25Qcm9wZXJ0eShcImxvY1wiKSkge1xuICAgICAgICBuZXdEb2MubG9jID0gZG9jLmxvYztcbiAgICAgIH1cblxuICAgICAgLy8gTm93LCBmb3IgdGhlIG9wZXJhdGlvbiB3ZSdyZSBydW5uaW5nLCBmaW5kIGFueSBmcmFnbWVudHMgcmVmZXJlbmNlZCBieVxuICAgICAgLy8gaXQgb3IgdGhlIGZyYWdtZW50cyBpdCByZWZlcmVuY2VzXG4gICAgICB2YXIgb3BSZWZzID0gZGVmaW5pdGlvblJlZnNbb3BlcmF0aW9uTmFtZV0gfHwgbmV3IFNldCgpO1xuICAgICAgdmFyIGFsbFJlZnMgPSBuZXcgU2V0KCk7XG4gICAgICB2YXIgbmV3UmVmcyA9IG5ldyBTZXQoKTtcblxuICAgICAgLy8gSUUgMTEgZG9lc24ndCBzdXBwb3J0IFwibmV3IFNldChpdGVyYWJsZSlcIiwgc28gd2UgYWRkIHRoZSBtZW1iZXJzIG9mIG9wUmVmcyB0byBuZXdSZWZzIG9uZSBieSBvbmVcbiAgICAgIG9wUmVmcy5mb3JFYWNoKGZ1bmN0aW9uKHJlZk5hbWUpIHtcbiAgICAgICAgbmV3UmVmcy5hZGQocmVmTmFtZSk7XG4gICAgICB9KTtcblxuICAgICAgd2hpbGUgKG5ld1JlZnMuc2l6ZSA+IDApIHtcbiAgICAgICAgdmFyIHByZXZSZWZzID0gbmV3UmVmcztcbiAgICAgICAgbmV3UmVmcyA9IG5ldyBTZXQoKTtcblxuICAgICAgICBwcmV2UmVmcy5mb3JFYWNoKGZ1bmN0aW9uKHJlZk5hbWUpIHtcbiAgICAgICAgICBpZiAoIWFsbFJlZnMuaGFzKHJlZk5hbWUpKSB7XG4gICAgICAgICAgICBhbGxSZWZzLmFkZChyZWZOYW1lKTtcbiAgICAgICAgICAgIHZhciBjaGlsZFJlZnMgPSBkZWZpbml0aW9uUmVmc1tyZWZOYW1lXSB8fCBuZXcgU2V0KCk7XG4gICAgICAgICAgICBjaGlsZFJlZnMuZm9yRWFjaChmdW5jdGlvbihjaGlsZFJlZikge1xuICAgICAgICAgICAgICBuZXdSZWZzLmFkZChjaGlsZFJlZik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBhbGxSZWZzLmZvckVhY2goZnVuY3Rpb24ocmVmTmFtZSkge1xuICAgICAgICB2YXIgb3AgPSBmaW5kT3BlcmF0aW9uKGRvYywgcmVmTmFtZSk7XG4gICAgICAgIGlmIChvcCkge1xuICAgICAgICAgIG5ld0RvYy5kZWZpbml0aW9ucy5wdXNoKG9wKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBuZXdEb2M7XG4gICAgfVxuICAgIFxuICAgIG1vZHVsZS5leHBvcnRzID0gZG9jO1xuICAgIFxuICAgICAgICBtb2R1bGUuZXhwb3J0c1tcIlRleHRBbm5vdGF0aW9uc0ZyYWdtZW50XCJdID0gb25lUXVlcnkoZG9jLCBcIlRleHRBbm5vdGF0aW9uc0ZyYWdtZW50XCIpO1xuICAgICAgICBcbiIsImV4cG9ydCBlbnVtIFJpY2hUZXh0VHlwZUVudW0ge1xuICB0ZXh0ID0gXCJ0ZXh0XCIsXG4gIG1lbnRpb24gPSBcIm1lbnRpb25cIixcbiAgZXF1YXRpb24gPSBcImVxdWF0aW9uXCIsXG59XG5leHBvcnQgZW51bSBQcm9wZXJ0eVR5cGVFbnVtIHtcbiAgdGl0bGUgPSBcInRpdGxlXCIsXG4gIHJpY2hfdGV4dCA9IFwicmljaF90ZXh0XCIsXG4gIG51bWJlciA9IFwibnVtYmVyXCIsXG4gIHNlbGVjdCA9IFwic2VsZWN0XCIsXG4gIG11bHRpX3NlbGVjdCA9IFwibXVsdGlfc2VsZWN0XCIsXG4gIGRhdGUgPSBcImRhdGVcIixcbiAgcGVvcGxlID0gXCJwZW9wbGVcIixcbiAgZmlsZSA9IFwiZmlsZVwiLFxuICBjaGVja2JveCA9IFwiY2hlY2tib3hcIixcbiAgdXJsID0gXCJ1cmxcIixcbiAgZW1haWwgPSBcImVtYWlsXCIsXG4gIHBob25lX251bWJlciA9IFwicGhvbmVfbnVtYmVyXCIsXG4gIGZvcm11bGEgPSBcImZvcm11bGFcIixcbiAgcmVsYXRpb24gPSBcInJlbGF0aW9uXCIsXG4gIHJvbGx1cCA9IFwicm9sbHVwXCIsXG4gIGNyZWF0ZWRfdGltZSA9IFwiY3JlYXRlZF90aW1lXCIsXG4gIGNyZWF0ZWRfYnkgPSBcImNyZWF0ZWRfYnlcIixcbiAgbGFzdF9lZGl0ZWRfdGltZSA9IFwibGFzdF9lZGl0ZWRfdGltZVwiLFxuICBsYXN0X2VkaXRlZF9ieSA9IFwibGFzdF9lZGl0ZWRfYnlcIixcbn1cbiIsImltcG9ydCB7XG4gIFByb3BlcnR5VmFsdWVCYXNlLFxuICBSaWNoVGV4dFByb3BlcnR5VmFsdWUsXG4gIFRpdGxlUHJvcGVydHlWYWx1ZSxcbn0gZnJvbSBcIkBub3Rpb25ocS9jbGllbnQvYnVpbGQvc3JjL2FwaS10eXBlc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gaXNSaWNoVGV4dChcbiAgcHJvcDogUHJvcGVydHlWYWx1ZUJhc2Vcbik6IHByb3AgaXMgUmljaFRleHRQcm9wZXJ0eVZhbHVlIHtcbiAgcmV0dXJuIHByb3AgJiYgXCJyaWNoX3RleHRcIiBpbiBwcm9wO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGlzVGl0bGUocHJvcDogUHJvcGVydHlWYWx1ZUJhc2UpOiBwcm9wIGlzIFRpdGxlUHJvcGVydHlWYWx1ZSB7XG4gIHJldHVybiBwcm9wICYmIFwidGl0bGVcIiBpbiBwcm9wO1xufVxuXG4vKipcbiAqIFJldHJpZXZlIHRoZSBwbGFpbl90ZXh0IG9mIGEgVGl0bGUvUmljaFRleHQgcHJvcGVydHlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFBsYWluVGV4dChwcm9wOiBQcm9wZXJ0eVZhbHVlQmFzZSk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gIGlmIChpc1RpdGxlKHByb3ApKSB7XG4gICAgcmV0dXJuIHByb3AudGl0bGVbMF0/LnBsYWluX3RleHQ7XG4gIH0gZWxzZSBpZiAoaXNSaWNoVGV4dChwcm9wKSkge1xuICAgIHJldHVybiBwcm9wLnJpY2hfdGV4dFswXT8ucGxhaW5fdGV4dDtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG59XG4iLCJpbXBvcnQgR1FMSnNvbiwgeyBHcmFwaFFMSlNPTk9iamVjdCBhcyBKU09OT2JqZWN0IH0gZnJvbSBcImdyYXBocWwtdHlwZS1qc29uXCI7XG5cbmltcG9ydCB7IHBhc2NhbENhc2UgfSBmcm9tIFwiY2hhbmdlLWNhc2VcIjtcblxuaW1wb3J0IHsgUHJvcGVydHlUeXBlRW51bSwgUmljaFRleHRUeXBlRW51bSB9IGZyb20gXCIuL2VudW1zXCI7XG5cbmV4cG9ydCBjb25zdCBBbnlUZXh0ID0ge1xuICBfX3Jlc29sdmVUeXBlOiAodGV4dCkgPT4gcGFzY2FsQ2FzZSh0ZXh0LnR5cGUpLFxufTtcbmV4cG9ydCBjb25zdCBQcm9wZXJ0eSA9IHtcbiAgX19yZXNvbHZlVHlwZShvYmosIGN0eCwgaW5mbykge1xuICAgIHJldHVybiBwYXNjYWxDYXNlKGBwcm9wZXJ0eV8ke29iai50eXBlfWApO1xuICB9LFxufTtcbiIsIlxuICAgIHZhciBkb2MgPSB7XCJraW5kXCI6XCJEb2N1bWVudFwiLFwiZGVmaW5pdGlvbnNcIjpbe1wia2luZFwiOlwiRW51bVR5cGVEZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIk5vdGlvblNvcnRUaW1lc3RhbXBcIn0sXCJkaXJlY3RpdmVzXCI6W10sXCJ2YWx1ZXNcIjpbe1wia2luZFwiOlwiRW51bVZhbHVlRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJjcmVhdGVkX3RpbWVcIn0sXCJkaXJlY3RpdmVzXCI6W119LHtcImtpbmRcIjpcIkVudW1WYWx1ZURlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwibGFzdF9lZGl0ZWRfdGltZVwifSxcImRpcmVjdGl2ZXNcIjpbXX1dfSx7XCJraW5kXCI6XCJFbnVtVHlwZURlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiTm90aW9uU29ydERpcmVjdGlvblwifSxcImRpcmVjdGl2ZXNcIjpbXSxcInZhbHVlc1wiOlt7XCJraW5kXCI6XCJFbnVtVmFsdWVEZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcImFzY2VuZGluZ1wifSxcImRpcmVjdGl2ZXNcIjpbXX0se1wia2luZFwiOlwiRW51bVZhbHVlRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJkZXNjZW5kaW5nXCJ9LFwiZGlyZWN0aXZlc1wiOltdfV19LHtcImtpbmRcIjpcIklucHV0T2JqZWN0VHlwZURlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiTm90aW9uU29ydFwifSxcImRpcmVjdGl2ZXNcIjpbXSxcImZpZWxkc1wiOlt7XCJraW5kXCI6XCJJbnB1dFZhbHVlRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJwcm9wZXJ0eVwifSxcInR5cGVcIjp7XCJraW5kXCI6XCJOYW1lZFR5cGVcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiU3RyaW5nXCJ9fSxcImRpcmVjdGl2ZXNcIjpbXX0se1wia2luZFwiOlwiSW5wdXRWYWx1ZURlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwidGltZXN0YW1wXCJ9LFwidHlwZVwiOntcImtpbmRcIjpcIk5hbWVkVHlwZVwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJOb3Rpb25Tb3J0VGltZXN0YW1wXCJ9fSxcImRpcmVjdGl2ZXNcIjpbXX0se1wia2luZFwiOlwiSW5wdXRWYWx1ZURlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiZGlyZWN0aW9uXCJ9LFwidHlwZVwiOntcImtpbmRcIjpcIk5hbWVkVHlwZVwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJOb3Rpb25Tb3J0RGlyZWN0aW9uXCJ9fSxcImRpcmVjdGl2ZXNcIjpbXX1dfV0sXCJsb2NcIjp7XCJzdGFydFwiOjAsXCJlbmRcIjoyMjR9fTtcbiAgICBkb2MubG9jLnNvdXJjZSA9IHtcImJvZHlcIjpcImVudW0gTm90aW9uU29ydFRpbWVzdGFtcCB7XFxuICBjcmVhdGVkX3RpbWVcXG4gIGxhc3RfZWRpdGVkX3RpbWVcXG59XFxuZW51bSBOb3Rpb25Tb3J0RGlyZWN0aW9uIHtcXG4gIGFzY2VuZGluZ1xcbiAgZGVzY2VuZGluZ1xcbn1cXG5cXG5pbnB1dCBOb3Rpb25Tb3J0IHtcXG4gIHByb3BlcnR5OiBTdHJpbmdcXG4gIHRpbWVzdGFtcDogTm90aW9uU29ydFRpbWVzdGFtcFxcbiAgZGlyZWN0aW9uOiBOb3Rpb25Tb3J0RGlyZWN0aW9uXFxufVxcblwiLFwibmFtZVwiOlwiR3JhcGhRTCByZXF1ZXN0XCIsXCJsb2NhdGlvbk9mZnNldFwiOntcImxpbmVcIjoxLFwiY29sdW1uXCI6MX19O1xuICBcblxuICAgIHZhciBuYW1lcyA9IHt9O1xuICAgIGZ1bmN0aW9uIHVuaXF1ZShkZWZzKSB7XG4gICAgICByZXR1cm4gZGVmcy5maWx0ZXIoXG4gICAgICAgIGZ1bmN0aW9uKGRlZikge1xuICAgICAgICAgIGlmIChkZWYua2luZCAhPT0gJ0ZyYWdtZW50RGVmaW5pdGlvbicpIHJldHVybiB0cnVlO1xuICAgICAgICAgIHZhciBuYW1lID0gZGVmLm5hbWUudmFsdWVcbiAgICAgICAgICBpZiAobmFtZXNbbmFtZV0pIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmFtZXNbbmFtZV0gPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICApXG4gICAgfVxuICBcblxuICAgICAgbW9kdWxlLmV4cG9ydHMgPSBkb2M7XG4gICAgXG4iLCJpbXBvcnQgeyBjcmVhdGVNb2R1bGUgfSBmcm9tIFwiZ3JhcGhxbC1tb2R1bGVzXCI7XG5cbmltcG9ydCB0eXBlRGVmcyBmcm9tIFwiLi9zY2hlbWEuZ3JhcGhxbFwiO1xuaW1wb3J0IHJlc29sdmVycyBmcm9tIFwiLi9yZXNvbHZlcnNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlTW9kdWxlKHtcbiAgaWQ6IFwicHJvamVjdHNcIixcbiAgZGlybmFtZTogX19kaXJuYW1lLFxuICB0eXBlRGVmczogW3R5cGVEZWZzXSxcbiAgcmVzb2x2ZXJzLFxufSk7XG4iLCJpbXBvcnQgeyBQYWdlLCBTb3J0IH0gZnJvbSBcIkBub3Rpb25ocS9jbGllbnQvYnVpbGQvc3JjL2FwaS10eXBlc1wiO1xuaW1wb3J0IEdRTEpzb24sIHsgR3JhcGhRTEpTT05PYmplY3QgYXMgSlNPTk9iamVjdCB9IGZyb20gXCJncmFwaHFsLXR5cGUtanNvblwiO1xuXG5pbXBvcnQgeyBEYXRhU291cmNlcywgTm90aW9uIH0gZnJvbSBcIi4uL2RhdGFTb3VyY2VzXCI7XG5pbXBvcnQgeyBzbHVnaWZ5IH0gZnJvbSBcIi4uL2hlbHBlcnMvc2x1Z2lmeVwiO1xuXG5pbXBvcnQgKiBhcyBOb3Rpb25FbnVtcyBmcm9tIFwiLi4vbm90aW9uL2VudW1zXCI7XG5pbXBvcnQgeyBnZXRQbGFpblRleHQgfSBmcm9tIFwiLi4vbm90aW9uL2hlbHBlcnNcIjtcbmltcG9ydCAqIGFzIE5vdGlvblR5cGVzIGZyb20gXCIuLi9ub3Rpb24vcmVzb2x2ZXJzXCI7XG5cbmNvbnN0IGRhdGFiYXNlSWQgPSBcIjllNjRjM2E4OWE5ZjRmODU4ZDVhYjE2NzQxMDljZjdkXCI7XG5cbi8vIGV4cG9ydCBhc3luYyBmdW5jdGlvbiBwcm9qZWN0c0RhdGFiYXNlKFxuLy8gICBfOiBhbnksXG4vLyAgIHBhcmFtcyxcbi8vICAgeyBkYXRhU291cmNlcyB9OiB7IGRhdGFTb3VyY2VzOiBEYXRhU291cmNlcyB9XG4vLyApIHtcbi8vICAgY29uc3QgcHJvamVjdHNBUEkgPSBkYXRhU291cmNlcy5ub3Rpb24uYXBpO1xuLy8gICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHByb2plY3RzQVBJLmRhdGFiYXNlcy5yZXRyaWV2ZSh7XG4vLyAgICAgZGF0YWJhc2VfaWQ6IGRhdGFiYXNlSWQsXG4vLyAgIH0pO1xuXG4vLyAgIHJldHVybiB7XG4vLyAgICAgaWQ6IHJlc3BvbnNlLmlkLFxuLy8gICAgIG9iamVjdDogcmVzcG9uc2Uub2JqZWN0LFxuLy8gICAgIGNyZWF0ZWRfdGltZTogcmVzcG9uc2UuY3JlYXRlZF90aW1lLFxuLy8gICAgIGxhc3RfZWRpdGVkX3RpbWU6IHJlc3BvbnNlLmxhc3RfZWRpdGVkX3RpbWUsXG4vLyAgICAgdGl0bGU6IHJlc3BvbnNlLnRpdGxlLFxuLy8gICAgIHByb3BlcnRpZXM6IHJlc3BvbnNlLnByb3BlcnRpZXMsXG4vLyAgIH07XG4vLyB9XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBwcm9qZWN0cyhcbiAgXzogYW55LFxuICB7XG4gICAgc3RhcnRfY3Vyc29yLFxuICAgIHNvcnRzLFxuICAgIHBhZ2Vfc2l6ZSA9IDEwMCxcbiAgfTogeyBzdGFydF9jdXJzb3I/OiBzdHJpbmc7IHBhZ2Vfc2l6ZTogbnVtYmVyOyBzb3J0czogU29ydFtdIH0sXG4gIHsgZGF0YVNvdXJjZXMgfTogeyBkYXRhU291cmNlczogRGF0YVNvdXJjZXMgfVxuKSB7XG4gIGNvbnN0IHByb2plY3RzQVBJID0gZGF0YVNvdXJjZXMubm90aW9uLmFwaTtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBwcm9qZWN0c0FQSS5kYXRhYmFzZXMucXVlcnkoe1xuICAgIGRhdGFiYXNlX2lkOiBkYXRhYmFzZUlkLFxuICAgIHN0YXJ0X2N1cnNvcixcbiAgICBwYWdlX3NpemUsXG4gICAgc29ydHMsXG4gIH0pO1xuICBjb25zdCBwcm9qZWN0cyA9IHJlc3BvbnNlLnJlc3VsdHM7XG5cbiAgY29uc29sZS5sb2cocHJvamVjdHMpO1xuICAvLyByZXNwb25zZS5yZXN1bHRzLm1hcCgoaXRlbSkgPT4ge1xuICAvLyAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGl0ZW0ucHJvcGVydGllcywgbnVsbCwgXCJcXHRcIikpO1xuICAvLyB9KTtcblxuICAvKipcbiAgICogVmFsaWRhdGVzIGlmIHRoZSBwcm9qZWN0IGhhcyB0aGUgcmVxdWlyZWQgcHJvcGVydHlzXG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn1cbiAgICovXG4gIGZ1bmN0aW9uIHZhbGlkYXRlUHJvamVjdFByb3BlcnRpZXMocHJvajogUGFnZSk6IFBhZ2Uge1xuICAgIGNvbnN0IHJlcXVpcmVkUHJvcGVydGllcyA9IFtcIk5hbWVcIiwgXCJzbHVnXCJdO1xuICAgIHJlcXVpcmVkUHJvcGVydGllcy5mb3JFYWNoKChyZXFQcm9wKSA9PiB7XG4gICAgICBpZiAoIShyZXFQcm9wIGluIHByb2oucHJvcGVydGllcykpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICAgICBgTm90aW9uIFBhZ2UgJHtwcm9qLmlkfSBpcyBtaXNzaW5nIHByb3BlcnR5ICR7cmVxUHJvcH1gXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcHJvajtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgdG90YWxDb3VudDogdW5kZWZpbmVkLFxuICAgIGVkZ2VzOiBwcm9qZWN0cy5tYXAodmFsaWRhdGVQcm9qZWN0UHJvcGVydGllcykubWFwKChpdGVtKSA9PiB7XG4gICAgICBjb25zdCBuYW1lID0gZ2V0UGxhaW5UZXh0KGl0ZW0ucHJvcGVydGllc1tcIk5hbWVcIl0pO1xuICAgICAgY29uc3Qgc2x1ZyA9IGdldFBsYWluVGV4dChpdGVtLnByb3BlcnRpZXNbXCJzbHVnXCJdKSB8fCBzbHVnaWZ5KG5hbWUpO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbm9kZToge1xuICAgICAgICAgIGlkOiBpdGVtLmlkLFxuICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgdGl0bGU6IG5hbWUsXG4gICAgICAgICAgc2x1Zzogc2x1Zy50b0xvd2VyQ2FzZSgpLFxuXG4gICAgICAgICAgY3JlYXRlZF90aW1lOiBpdGVtLmNyZWF0ZWRfdGltZSxcbiAgICAgICAgICBsYXN0X2VkaXRlZF90aW1lOiBpdGVtLmxhc3RfZWRpdGVkX3RpbWUsXG5cbiAgICAgICAgICBwdWJsaXNoZWQ6IGl0ZW0ucHJvcGVydGllc1tcInB1Ymxpc2hlZFwiXSxcbiAgICAgICAgICBhcmNoaXZlZDogaXRlbS5hcmNoaXZlZCxcblxuICAgICAgICAgIHByb3BlcnRpZXM6IE9iamVjdC5lbnRyaWVzKGl0ZW0ucHJvcGVydGllcykubWFwKFxuICAgICAgICAgICAgKFtrZXksIHsgaWQsIHR5cGUsIC4uLnJlc3QgfV0pID0+ICh7XG4gICAgICAgICAgICAgIGlkOiBpZCxcbiAgICAgICAgICAgICAgbmFtZToga2V5LFxuICAgICAgICAgICAgICB0eXBlOiB0eXBlLFxuICAgICAgICAgICAgICAuLi5yZXN0LFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICApLFxuICAgICAgICB9LFxuICAgICAgICBjdXJzb3I6IGl0ZW0uaWQsXG4gICAgICB9O1xuICAgIH0pLFxuICAgIHBhZ2VJbmZvOiB7XG4gICAgICBlbmRDdXJzb3I6IHJlc3BvbnNlLm5leHRfY3Vyc29yLFxuICAgICAgaGFzTmV4dFBhZ2U6IHJlc3BvbnNlLmhhc19tb3JlLFxuICAgIH0sXG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgSlNPTk9iamVjdCxcbiAgLi4uTm90aW9uRW51bXMsXG4gIC4uLk5vdGlvblR5cGVzLFxuICBRdWVyeToge1xuICAgIC8vIHByb2plY3RzRGF0YWJhc2UsXG4gICAgcHJvamVjdHMsXG4gIH0sXG59O1xuIiwiXG4gICAgdmFyIGRvYyA9IHtcImtpbmRcIjpcIkRvY3VtZW50XCIsXCJkZWZpbml0aW9uc1wiOlt7XCJraW5kXCI6XCJPYmplY3RUeXBlRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJQcm9qZWN0SXRlbVwifSxcImludGVyZmFjZXNcIjpbe1wia2luZFwiOlwiTmFtZWRUeXBlXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIk5vZGVcIn19XSxcImRpcmVjdGl2ZXNcIjpbXSxcImZpZWxkc1wiOlt7XCJraW5kXCI6XCJGaWVsZERlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiaWRcIn0sXCJhcmd1bWVudHNcIjpbXSxcInR5cGVcIjp7XCJraW5kXCI6XCJOb25OdWxsVHlwZVwiLFwidHlwZVwiOntcImtpbmRcIjpcIk5hbWVkVHlwZVwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJJRFwifX19LFwiZGlyZWN0aXZlc1wiOltdfSx7XCJraW5kXCI6XCJGaWVsZERlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwibmFtZVwifSxcImFyZ3VtZW50c1wiOltdLFwidHlwZVwiOntcImtpbmRcIjpcIk5vbk51bGxUeXBlXCIsXCJ0eXBlXCI6e1wia2luZFwiOlwiTmFtZWRUeXBlXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIlN0cmluZ1wifX19LFwiZGlyZWN0aXZlc1wiOltdfSx7XCJraW5kXCI6XCJGaWVsZERlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwic2x1Z1wifSxcImFyZ3VtZW50c1wiOltdLFwidHlwZVwiOntcImtpbmRcIjpcIk5vbk51bGxUeXBlXCIsXCJ0eXBlXCI6e1wia2luZFwiOlwiTmFtZWRUeXBlXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIlN0cmluZ1wifX19LFwiZGlyZWN0aXZlc1wiOltdfSx7XCJraW5kXCI6XCJGaWVsZERlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwidGl0bGVcIn0sXCJhcmd1bWVudHNcIjpbXSxcInR5cGVcIjp7XCJraW5kXCI6XCJOb25OdWxsVHlwZVwiLFwidHlwZVwiOntcImtpbmRcIjpcIk5hbWVkVHlwZVwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJTdHJpbmdcIn19fSxcImRpcmVjdGl2ZXNcIjpbXX0se1wia2luZFwiOlwiRmllbGREZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcImRlc2NyaXB0aW9uXCJ9LFwiYXJndW1lbnRzXCI6W10sXCJ0eXBlXCI6e1wia2luZFwiOlwiTmFtZWRUeXBlXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIlN0cmluZ1wifX0sXCJkaXJlY3RpdmVzXCI6W119LHtcImtpbmRcIjpcIkZpZWxkRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJjcmVhdGVkX3RpbWVcIn0sXCJhcmd1bWVudHNcIjpbXSxcInR5cGVcIjp7XCJraW5kXCI6XCJOYW1lZFR5cGVcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiU3RyaW5nXCJ9fSxcImRpcmVjdGl2ZXNcIjpbXX0se1wia2luZFwiOlwiRmllbGREZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcImxhc3RfZWRpdGVkX3RpbWVcIn0sXCJhcmd1bWVudHNcIjpbXSxcInR5cGVcIjp7XCJraW5kXCI6XCJOYW1lZFR5cGVcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiU3RyaW5nXCJ9fSxcImRpcmVjdGl2ZXNcIjpbXX0se1wia2luZFwiOlwiRmllbGREZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcInB1Ymxpc2hlZFwifSxcImFyZ3VtZW50c1wiOltdLFwidHlwZVwiOntcImtpbmRcIjpcIk5hbWVkVHlwZVwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJCb29sZWFuXCJ9fSxcImRpcmVjdGl2ZXNcIjpbXX0se1wia2luZFwiOlwiRmllbGREZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcImFyY2hpdmVkXCJ9LFwiYXJndW1lbnRzXCI6W10sXCJ0eXBlXCI6e1wia2luZFwiOlwiTmFtZWRUeXBlXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIkJvb2xlYW5cIn19LFwiZGlyZWN0aXZlc1wiOltdfSx7XCJraW5kXCI6XCJGaWVsZERlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwicHJvcGVydGllc1wifSxcImFyZ3VtZW50c1wiOltdLFwidHlwZVwiOntcImtpbmRcIjpcIkxpc3RUeXBlXCIsXCJ0eXBlXCI6e1wia2luZFwiOlwiTmFtZWRUeXBlXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIlByb3BlcnR5XCJ9fX0sXCJkaXJlY3RpdmVzXCI6W119LHtcImtpbmRcIjpcIkZpZWxkRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJjb250ZW50XCJ9LFwiYXJndW1lbnRzXCI6W10sXCJ0eXBlXCI6e1wia2luZFwiOlwiTmFtZWRUeXBlXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIkpTT05PYmplY3RcIn19LFwiZGlyZWN0aXZlc1wiOltdfV19LHtcImtpbmRcIjpcIk9iamVjdFR5cGVEZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIlByb2plY3RJdGVtc0VkZ2VcIn0sXCJpbnRlcmZhY2VzXCI6W3tcImtpbmRcIjpcIk5hbWVkVHlwZVwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJFZGdlXCJ9fV0sXCJkaXJlY3RpdmVzXCI6W10sXCJmaWVsZHNcIjpbe1wia2luZFwiOlwiRmllbGREZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIm5vZGVcIn0sXCJhcmd1bWVudHNcIjpbXSxcInR5cGVcIjp7XCJraW5kXCI6XCJOYW1lZFR5cGVcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiUHJvamVjdEl0ZW1cIn19LFwiZGlyZWN0aXZlc1wiOltdfSx7XCJraW5kXCI6XCJGaWVsZERlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiY3Vyc29yXCJ9LFwiYXJndW1lbnRzXCI6W10sXCJ0eXBlXCI6e1wia2luZFwiOlwiTm9uTnVsbFR5cGVcIixcInR5cGVcIjp7XCJraW5kXCI6XCJOYW1lZFR5cGVcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiSURcIn19fSxcImRpcmVjdGl2ZXNcIjpbXX1dfSx7XCJraW5kXCI6XCJPYmplY3RUeXBlRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJQcm9qZWN0SXRlbXNDb25uZWN0aW9uXCJ9LFwiaW50ZXJmYWNlc1wiOlt7XCJraW5kXCI6XCJOYW1lZFR5cGVcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiUGFnZVwifX1dLFwiZGlyZWN0aXZlc1wiOltdLFwiZmllbGRzXCI6W3tcImtpbmRcIjpcIkZpZWxkRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJ0b3RhbENvdW50XCJ9LFwiYXJndW1lbnRzXCI6W10sXCJ0eXBlXCI6e1wia2luZFwiOlwiTmFtZWRUeXBlXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIkludFwifX0sXCJkaXJlY3RpdmVzXCI6W119LHtcImtpbmRcIjpcIkZpZWxkRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJlZGdlc1wifSxcImFyZ3VtZW50c1wiOltdLFwidHlwZVwiOntcImtpbmRcIjpcIkxpc3RUeXBlXCIsXCJ0eXBlXCI6e1wia2luZFwiOlwiTmFtZWRUeXBlXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIlByb2plY3RJdGVtc0VkZ2VcIn19fSxcImRpcmVjdGl2ZXNcIjpbXX0se1wia2luZFwiOlwiRmllbGREZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcInBhZ2VJbmZvXCJ9LFwiYXJndW1lbnRzXCI6W10sXCJ0eXBlXCI6e1wia2luZFwiOlwiTm9uTnVsbFR5cGVcIixcInR5cGVcIjp7XCJraW5kXCI6XCJOYW1lZFR5cGVcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiUGFnZUluZm9cIn19fSxcImRpcmVjdGl2ZXNcIjpbXX1dfSx7XCJraW5kXCI6XCJPYmplY3RUeXBlRXh0ZW5zaW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIlF1ZXJ5XCJ9LFwiaW50ZXJmYWNlc1wiOltdLFwiZGlyZWN0aXZlc1wiOltdLFwiZmllbGRzXCI6W3tcImtpbmRcIjpcIkZpZWxkRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJwcm9qZWN0c1wifSxcImFyZ3VtZW50c1wiOlt7XCJraW5kXCI6XCJJbnB1dFZhbHVlRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJzdGFydF9jdXJzb3JcIn0sXCJ0eXBlXCI6e1wia2luZFwiOlwiTmFtZWRUeXBlXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIklEXCJ9fSxcImRpcmVjdGl2ZXNcIjpbXX0se1wia2luZFwiOlwiSW5wdXRWYWx1ZURlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwicGFnZV9zaXplXCJ9LFwidHlwZVwiOntcImtpbmRcIjpcIk5hbWVkVHlwZVwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJJbnRcIn19LFwiZGlyZWN0aXZlc1wiOltdfSx7XCJraW5kXCI6XCJJbnB1dFZhbHVlRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJzb3J0c1wifSxcInR5cGVcIjp7XCJraW5kXCI6XCJMaXN0VHlwZVwiLFwidHlwZVwiOntcImtpbmRcIjpcIk5hbWVkVHlwZVwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJOb3Rpb25Tb3J0XCJ9fX0sXCJkaXJlY3RpdmVzXCI6W119XSxcInR5cGVcIjp7XCJraW5kXCI6XCJOYW1lZFR5cGVcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiUHJvamVjdEl0ZW1zQ29ubmVjdGlvblwifX0sXCJkaXJlY3RpdmVzXCI6W119XX1dLFwibG9jXCI6e1wic3RhcnRcIjowLFwiZW5kXCI6NjgxfX07XG4gICAgZG9jLmxvYy5zb3VyY2UgPSB7XCJib2R5XCI6XCIjaW1wb3J0IFxcXCIuLi9ub3Rpb24vTm90aW9uLmdyYXBocWxcXFwiXFxuXFxudHlwZSBQcm9qZWN0SXRlbSBpbXBsZW1lbnRzIE5vZGUge1xcbiAgaWQ6IElEIVxcbiAgbmFtZTogU3RyaW5nIVxcbiAgc2x1ZzogU3RyaW5nIVxcbiAgdGl0bGU6IFN0cmluZyFcXG4gIGRlc2NyaXB0aW9uOiBTdHJpbmdcXG5cXG4gIGNyZWF0ZWRfdGltZTogU3RyaW5nXFxuICBsYXN0X2VkaXRlZF90aW1lOiBTdHJpbmdcXG5cXG4gIHB1Ymxpc2hlZDogQm9vbGVhblxcbiAgYXJjaGl2ZWQ6IEJvb2xlYW5cXG5cXG4gIHByb3BlcnRpZXM6IFtQcm9wZXJ0eV1cXG4gIGNvbnRlbnQ6IEpTT05PYmplY3RcXG59XFxuXFxudHlwZSBQcm9qZWN0SXRlbXNFZGdlIGltcGxlbWVudHMgRWRnZSB7XFxuICBub2RlOiBQcm9qZWN0SXRlbVxcbiAgY3Vyc29yOiBJRCFcXG59XFxuXFxudHlwZSBQcm9qZWN0SXRlbXNDb25uZWN0aW9uIGltcGxlbWVudHMgUGFnZSB7XFxuICB0b3RhbENvdW50OiBJbnRcXG4gIGVkZ2VzOiBbUHJvamVjdEl0ZW1zRWRnZV1cXG4gIHBhZ2VJbmZvOiBQYWdlSW5mbyFcXG59XFxuXFxuZXh0ZW5kIHR5cGUgUXVlcnkge1xcbiAgIyBwcm9qZWN0c0RhdGFiYXNlOiBEYXRhYmFzZVxcbiAgcHJvamVjdHMoXFxuICAgIHN0YXJ0X2N1cnNvcjogSURcXG4gICAgcGFnZV9zaXplOiBJbnRcXG4gICAgc29ydHM6IFtOb3Rpb25Tb3J0XVxcbiAgKTogUHJvamVjdEl0ZW1zQ29ubmVjdGlvblxcbiAgIyBwcm9qZWN0KGlkOiBJRCEpOiBQcm9qZWN0SXRlbVxcbn1cXG5cIixcIm5hbWVcIjpcIkdyYXBoUUwgcmVxdWVzdFwiLFwibG9jYXRpb25PZmZzZXRcIjp7XCJsaW5lXCI6MSxcImNvbHVtblwiOjF9fTtcbiAgXG5cbiAgICB2YXIgbmFtZXMgPSB7fTtcbiAgICBmdW5jdGlvbiB1bmlxdWUoZGVmcykge1xuICAgICAgcmV0dXJuIGRlZnMuZmlsdGVyKFxuICAgICAgICBmdW5jdGlvbihkZWYpIHtcbiAgICAgICAgICBpZiAoZGVmLmtpbmQgIT09ICdGcmFnbWVudERlZmluaXRpb24nKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB2YXIgbmFtZSA9IGRlZi5uYW1lLnZhbHVlXG4gICAgICAgICAgaWYgKG5hbWVzW25hbWVdKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5hbWVzW25hbWVdID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgKVxuICAgIH1cbiAgZG9jLmRlZmluaXRpb25zID0gZG9jLmRlZmluaXRpb25zLmNvbmNhdCh1bmlxdWUocmVxdWlyZShcIi4uL25vdGlvbi9Ob3Rpb24uZ3JhcGhxbFwiKS5kZWZpbml0aW9ucykpO1xuXG5cbiAgICAgIG1vZHVsZS5leHBvcnRzID0gZG9jO1xuICAgIFxuIiwiaW1wb3J0IGRvdGVudiBmcm9tIFwiZG90ZW52XCI7XG5kb3RlbnYuY29uZmlnKCk7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgQUlSVEFCTEU6IHtcbiAgICBhcGlLZXk6IHByb2Nlc3MuZW52W1wiQUlSVEFCTEVfQVBJS0VZXCJdIHx8IFwiPEFQSV9LRVlfSEVSRT5cIixcbiAgICBib29rc0Jhc2VJZDogXCJhcHBPcW0wb1FOV1l5UDVLZFwiLFxuICB9LFxuICBOT1RJT046IHtcbiAgICBhcGlLZXk6IHByb2Nlc3MuZW52W1wiTk9USU9OX0FQSV9LRVlcIl0gfHwgXCI8QVBJX0tFWV9IRVJFPlwiLFxuICB9LFxufTtcbiIsIlxuICAgIHZhciBkb2MgPSB7XCJraW5kXCI6XCJEb2N1bWVudFwiLFwiZGVmaW5pdGlvbnNcIjpbe1wia2luZFwiOlwiU2NhbGFyVHlwZURlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiSlNPTk9iamVjdFwifSxcImRpcmVjdGl2ZXNcIjpbXX0se1wia2luZFwiOlwiT2JqZWN0VHlwZURlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiUGFnZUluZm9cIn0sXCJpbnRlcmZhY2VzXCI6W10sXCJkaXJlY3RpdmVzXCI6W10sXCJmaWVsZHNcIjpbe1wia2luZFwiOlwiRmllbGREZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcInN0YXJ0Q3Vyc29yXCJ9LFwiYXJndW1lbnRzXCI6W10sXCJ0eXBlXCI6e1wia2luZFwiOlwiTmFtZWRUeXBlXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIklEXCJ9fSxcImRpcmVjdGl2ZXNcIjpbXX0se1wia2luZFwiOlwiRmllbGREZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcImVuZEN1cnNvclwifSxcImFyZ3VtZW50c1wiOltdLFwidHlwZVwiOntcImtpbmRcIjpcIk5hbWVkVHlwZVwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJJRFwifX0sXCJkaXJlY3RpdmVzXCI6W119LHtcImtpbmRcIjpcIkZpZWxkRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJoYXNOZXh0UGFnZVwifSxcImFyZ3VtZW50c1wiOltdLFwidHlwZVwiOntcImtpbmRcIjpcIk5hbWVkVHlwZVwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJCb29sZWFuXCJ9fSxcImRpcmVjdGl2ZXNcIjpbXX1dfSx7XCJraW5kXCI6XCJJbnRlcmZhY2VUeXBlRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJFZGdlXCJ9LFwiaW50ZXJmYWNlc1wiOltdLFwiZGlyZWN0aXZlc1wiOltdLFwiZmllbGRzXCI6W3tcImtpbmRcIjpcIkZpZWxkRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJub2RlXCJ9LFwiYXJndW1lbnRzXCI6W10sXCJ0eXBlXCI6e1wia2luZFwiOlwiTmFtZWRUeXBlXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIk5vZGVcIn19LFwiZGlyZWN0aXZlc1wiOltdfSx7XCJraW5kXCI6XCJGaWVsZERlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiY3Vyc29yXCJ9LFwiYXJndW1lbnRzXCI6W10sXCJ0eXBlXCI6e1wia2luZFwiOlwiTm9uTnVsbFR5cGVcIixcInR5cGVcIjp7XCJraW5kXCI6XCJOYW1lZFR5cGVcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiSURcIn19fSxcImRpcmVjdGl2ZXNcIjpbXX1dfSx7XCJraW5kXCI6XCJJbnRlcmZhY2VUeXBlRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJOb2RlXCJ9LFwiaW50ZXJmYWNlc1wiOltdLFwiZGlyZWN0aXZlc1wiOltdLFwiZmllbGRzXCI6W3tcImtpbmRcIjpcIkZpZWxkRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJpZFwifSxcImFyZ3VtZW50c1wiOltdLFwidHlwZVwiOntcImtpbmRcIjpcIk5vbk51bGxUeXBlXCIsXCJ0eXBlXCI6e1wia2luZFwiOlwiTmFtZWRUeXBlXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIklEXCJ9fX0sXCJkaXJlY3RpdmVzXCI6W119XX0se1wia2luZFwiOlwiSW50ZXJmYWNlVHlwZURlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiUGFnZVwifSxcImludGVyZmFjZXNcIjpbXSxcImRpcmVjdGl2ZXNcIjpbXSxcImZpZWxkc1wiOlt7XCJraW5kXCI6XCJGaWVsZERlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwidG90YWxDb3VudFwifSxcImFyZ3VtZW50c1wiOltdLFwidHlwZVwiOntcImtpbmRcIjpcIk5hbWVkVHlwZVwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJJbnRcIn19LFwiZGlyZWN0aXZlc1wiOltdfSx7XCJraW5kXCI6XCJGaWVsZERlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiZWRnZXNcIn0sXCJhcmd1bWVudHNcIjpbXSxcInR5cGVcIjp7XCJraW5kXCI6XCJMaXN0VHlwZVwiLFwidHlwZVwiOntcImtpbmRcIjpcIk5hbWVkVHlwZVwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJFZGdlXCJ9fX0sXCJkaXJlY3RpdmVzXCI6W119LHtcImtpbmRcIjpcIkZpZWxkRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJwYWdlSW5mb1wifSxcImFyZ3VtZW50c1wiOltdLFwidHlwZVwiOntcImtpbmRcIjpcIk5vbk51bGxUeXBlXCIsXCJ0eXBlXCI6e1wia2luZFwiOlwiTmFtZWRUeXBlXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIlBhZ2VJbmZvXCJ9fX0sXCJkaXJlY3RpdmVzXCI6W119XX1dLFwibG9jXCI6e1wic3RhcnRcIjowLFwiZW5kXCI6MjQ2fX07XG4gICAgZG9jLmxvYy5zb3VyY2UgPSB7XCJib2R5XCI6XCJzY2FsYXIgSlNPTk9iamVjdFxcblxcbnR5cGUgUGFnZUluZm8ge1xcbiAgc3RhcnRDdXJzb3I6IElEXFxuICBlbmRDdXJzb3I6IElEXFxuICBoYXNOZXh0UGFnZTogQm9vbGVhblxcbn1cXG5pbnRlcmZhY2UgRWRnZSB7XFxuICBub2RlOiBOb2RlXFxuICBjdXJzb3I6IElEIVxcbn1cXG5cXG5pbnRlcmZhY2UgTm9kZSB7XFxuICBpZDogSUQhXFxufVxcblxcbmludGVyZmFjZSBQYWdlIHtcXG4gIHRvdGFsQ291bnQ6IEludFxcbiAgZWRnZXM6IFtFZGdlXVxcbiAgcGFnZUluZm86IFBhZ2VJbmZvIVxcbn1cXG5cIixcIm5hbWVcIjpcIkdyYXBoUUwgcmVxdWVzdFwiLFwibG9jYXRpb25PZmZzZXRcIjp7XCJsaW5lXCI6MSxcImNvbHVtblwiOjF9fTtcbiAgXG5cbiAgICB2YXIgbmFtZXMgPSB7fTtcbiAgICBmdW5jdGlvbiB1bmlxdWUoZGVmcykge1xuICAgICAgcmV0dXJuIGRlZnMuZmlsdGVyKFxuICAgICAgICBmdW5jdGlvbihkZWYpIHtcbiAgICAgICAgICBpZiAoZGVmLmtpbmQgIT09ICdGcmFnbWVudERlZmluaXRpb24nKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB2YXIgbmFtZSA9IGRlZi5uYW1lLnZhbHVlXG4gICAgICAgICAgaWYgKG5hbWVzW25hbWVdKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5hbWVzW25hbWVdID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgKVxuICAgIH1cbiAgXG5cbiAgICAgIG1vZHVsZS5leHBvcnRzID0gZG9jO1xuICAgIFxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQG5vdGlvbmhxL2NsaWVudFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJhcG9sbG8tZGF0YXNvdXJjZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJhcG9sbG8tc2VydmVyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImFwb2xsby1zZXJ2ZXItY29yZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJhc3luY2FpcnRhYmxlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNoYW5nZS1jYXNlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImRvdGVudlwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJncmFwaHFsLW1vZHVsZXNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZ3JhcGhxbC10eXBlLWpzb25cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic2x1Z2lmeVwiKTsiXSwic291cmNlUm9vdCI6IiJ9