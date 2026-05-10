
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
	'use strict';

	// generated during release, do not modify

	const PUBLIC_VERSION = '5';

	if (typeof window !== 'undefined') {
		// @ts-expect-error
		((window.__svelte ??= {}).v ??= new Set()).add(PUBLIC_VERSION);
	}

	const EACH_ITEM_REACTIVE = 1;
	const EACH_INDEX_REACTIVE = 1 << 1;
	/** See EachBlock interface metadata.is_controlled for an explanation what this is */
	const EACH_IS_CONTROLLED = 1 << 2;
	const EACH_IS_ANIMATED = 1 << 3;
	const EACH_ITEM_IMMUTABLE = 1 << 4;

	const PROPS_IS_IMMUTABLE = 1;
	const PROPS_IS_RUNES = 1 << 1;
	const PROPS_IS_UPDATED = 1 << 2;
	const PROPS_IS_BINDABLE = 1 << 3;
	const PROPS_IS_LAZY_INITIAL = 1 << 4;

	const TRANSITION_IN = 1;
	const TRANSITION_OUT = 1 << 1;
	const TRANSITION_GLOBAL = 1 << 2;

	const TEMPLATE_FRAGMENT = 1;
	const TEMPLATE_USE_IMPORT_NODE = 1 << 1;

	const UNINITIALIZED = Symbol();

	// Dev-time component properties
	const FILENAME = Symbol('filename');

	const NAMESPACE_HTML = 'http://www.w3.org/1999/xhtml';
	const NAMESPACE_SVG = 'http://www.w3.org/2000/svg';
	const NAMESPACE_MATHML = 'http://www.w3.org/1998/Math/MathML';

	var DEV = false;

	// Store the references to globals in case someone tries to monkey patch these, causing the below
	// to de-opt (this occurs often when using popular extensions).
	var is_array = Array.isArray;
	var index_of = Array.prototype.indexOf;
	var includes = Array.prototype.includes;
	var array_from = Array.from;
	var define_property = Object.defineProperty;
	var get_descriptor = Object.getOwnPropertyDescriptor;
	var get_descriptors = Object.getOwnPropertyDescriptors;
	var object_prototype = Object.prototype;
	var array_prototype = Array.prototype;
	var get_prototype_of = Object.getPrototypeOf;
	var is_extensible = Object.isExtensible;

	/**
	 * @param {any} thing
	 * @returns {thing is Function}
	 */
	function is_function(thing) {
		return typeof thing === 'function';
	}

	const noop = () => {};

	/** @param {Function} fn */
	function run(fn) {
		return fn();
	}

	/** @param {Array<() => void>} arr */
	function run_all(arr) {
		for (var i = 0; i < arr.length; i++) {
			arr[i]();
		}
	}

	/**
	 * TODO replace with Promise.withResolvers once supported widely enough
	 * @template [T=void]
	 */
	function deferred() {
		/** @type {(value: T) => void} */
		var resolve;

		/** @type {(reason: any) => void} */
		var reject;

		/** @type {Promise<T>} */
		var promise = new Promise((res, rej) => {
			resolve = res;
			reject = rej;
		});

		// @ts-expect-error
		return { promise, resolve, reject };
	}

	// General flags
	const DERIVED = 1 << 1;
	const EFFECT = 1 << 2;
	const RENDER_EFFECT = 1 << 3;
	/**
	 * An effect that does not destroy its child effects when it reruns.
	 * Runs as part of render effects, i.e. not eagerly as part of tree traversal or effect flushing.
	 */
	const MANAGED_EFFECT = 1 << 24;
	/**
	 * An effect that does not destroy its child effects when it reruns (like MANAGED_EFFECT).
	 * Runs eagerly as part of tree traversal or effect flushing.
	 */
	const BLOCK_EFFECT = 1 << 4;
	const BRANCH_EFFECT = 1 << 5;
	const ROOT_EFFECT = 1 << 6;
	const BOUNDARY_EFFECT = 1 << 7;
	/**
	 * Indicates that a reaction is connected to an effect root — either it is an effect,
	 * or it is a derived that is depended on by at least one effect. If a derived has
	 * no dependents, we can disconnect it from the graph, allowing it to either be
	 * GC'd or reconnected later if an effect comes to depend on it again
	 */
	const CONNECTED = 1 << 9;
	const CLEAN = 1 << 10;
	const DIRTY = 1 << 11;
	const MAYBE_DIRTY = 1 << 12;
	const INERT = 1 << 13;
	const DESTROYED = 1 << 14;
	/** Set once a reaction has run for the first time */
	const REACTION_RAN = 1 << 15;
	/** Effect is in the process of getting destroyed. Can be observed in child teardown functions */
	const DESTROYING = 1 << 25;

	// Flags exclusive to effects
	/**
	 * 'Transparent' effects do not create a transition boundary.
	 * This is on a block effect 99% of the time but may also be on a branch effect if its parent block effect was pruned
	 */
	const EFFECT_TRANSPARENT = 1 << 16;
	const EAGER_EFFECT = 1 << 17;
	const HEAD_EFFECT = 1 << 18;
	const EFFECT_PRESERVED = 1 << 19;
	const USER_EFFECT = 1 << 20;
	const EFFECT_OFFSCREEN = 1 << 25;

	// Flags exclusive to deriveds
	/**
	 * Tells that we marked this derived and its reactions as visited during the "mark as (maybe) dirty"-phase.
	 * Will be lifted during execution of the derived and during checking its dirty state (both are necessary
	 * because a derived might be checked but not executed).
	 */
	const WAS_MARKED = 1 << 16;

	// Flags used for async
	const REACTION_IS_UPDATING = 1 << 21;
	const ASYNC = 1 << 22;

	const ERROR_VALUE = 1 << 23;

	const STATE_SYMBOL = Symbol('$state');
	const LEGACY_PROPS = Symbol('legacy props');
	const PROXY_PATH_SYMBOL = Symbol('proxy path');

	/** allow users to ignore aborted signal errors if `reason.name === 'StaleReactionError` */
	const STALE_REACTION = new (class StaleReactionError extends Error {
		name = 'StaleReactionError';
		message = 'The reaction that called `getAbortSignal()` was re-run or destroyed';
	})();

	const IS_XHTML =
		// We gotta write it like this because after downleveling the pure comment may end up in the wrong location
		!!globalThis.document?.contentType &&
		/* @__PURE__ */ globalThis.document.contentType.includes('xml');
	const ELEMENT_NODE = 1;
	const DOCUMENT_FRAGMENT_NODE = 11;

	/* This file is generated by scripts/process-messages/index.js. Do not edit! */


	/**
	 * `%name%(...)` can only be used during component initialisation
	 * @param {string} name
	 * @returns {never}
	 */
	function lifecycle_outside_component(name) {
		{
			throw new Error(`https://svelte.dev/e/lifecycle_outside_component`);
		}
	}

	/**
	 * `%name%` is not a store with a `subscribe` method
	 * @param {string} name
	 * @returns {never}
	 */
	function store_invalid_shape(name) {
		{
			throw new Error(`https://svelte.dev/e/store_invalid_shape`);
		}
	}

	/* This file is generated by scripts/process-messages/index.js. Do not edit! */


	/**
	 * Cannot create a `$derived(...)` with an `await` expression outside of an effect tree
	 * @returns {never}
	 */
	function async_derived_orphan() {
		{
			throw new Error(`https://svelte.dev/e/async_derived_orphan`);
		}
	}

	/**
	 * Calling `%method%` on a component instance (of %component%) is no longer valid in Svelte 5
	 * @param {string} method
	 * @param {string} component
	 * @returns {never}
	 */
	function component_api_changed(method, component) {
		{
			throw new Error(`https://svelte.dev/e/component_api_changed`);
		}
	}

	/**
	 * Attempted to instantiate %component% with `new %name%`, which is no longer valid in Svelte 5. If this component is not under your control, set the `compatibility.componentApi` compiler option to `4` to keep it working.
	 * @param {string} component
	 * @param {string} name
	 * @returns {never}
	 */
	function component_api_invalid_new(component, name) {
		{
			throw new Error(`https://svelte.dev/e/component_api_invalid_new`);
		}
	}

	/**
	 * Keyed each block has duplicate key `%value%` at indexes %a% and %b%
	 * @param {string} a
	 * @param {string} b
	 * @param {string | undefined | null} [value]
	 * @returns {never}
	 */
	function each_key_duplicate(a, b, value) {
		{
			throw new Error(`https://svelte.dev/e/each_key_duplicate`);
		}
	}

	/**
	 * `%rune%` cannot be used inside an effect cleanup function
	 * @param {string} rune
	 * @returns {never}
	 */
	function effect_in_teardown(rune) {
		{
			throw new Error(`https://svelte.dev/e/effect_in_teardown`);
		}
	}

	/**
	 * Effect cannot be created inside a `$derived` value that was not itself created inside an effect
	 * @returns {never}
	 */
	function effect_in_unowned_derived() {
		{
			throw new Error(`https://svelte.dev/e/effect_in_unowned_derived`);
		}
	}

	/**
	 * `%rune%` can only be used inside an effect (e.g. during component initialisation)
	 * @param {string} rune
	 * @returns {never}
	 */
	function effect_orphan(rune) {
		{
			throw new Error(`https://svelte.dev/e/effect_orphan`);
		}
	}

	/**
	 * Maximum update depth exceeded. This typically indicates that an effect reads and writes the same piece of state
	 * @returns {never}
	 */
	function effect_update_depth_exceeded() {
		{
			throw new Error(`https://svelte.dev/e/effect_update_depth_exceeded`);
		}
	}

	/**
	 * Cannot do `bind:%key%={undefined}` when `%key%` has a fallback value
	 * @param {string} key
	 * @returns {never}
	 */
	function props_invalid_value(key) {
		{
			throw new Error(`https://svelte.dev/e/props_invalid_value`);
		}
	}

	/**
	 * Property descriptors defined on `$state` objects must contain `value` and always be `enumerable`, `configurable` and `writable`.
	 * @returns {never}
	 */
	function state_descriptors_fixed() {
		{
			throw new Error(`https://svelte.dev/e/state_descriptors_fixed`);
		}
	}

	/**
	 * Cannot set prototype of `$state` object
	 * @returns {never}
	 */
	function state_prototype_fixed() {
		{
			throw new Error(`https://svelte.dev/e/state_prototype_fixed`);
		}
	}

	/**
	 * Updating state inside `$derived(...)`, `$inspect(...)` or a template expression is forbidden. If the value should not be reactive, declare it without `$state`
	 * @returns {never}
	 */
	function state_unsafe_mutation() {
		{
			throw new Error(`https://svelte.dev/e/state_unsafe_mutation`);
		}
	}

	/**
	 * A `<svelte:boundary>` `reset` function cannot be called while an error is still being handled
	 * @returns {never}
	 */
	function svelte_boundary_reset_onerror() {
		{
			throw new Error(`https://svelte.dev/e/svelte_boundary_reset_onerror`);
		}
	}

	/* This file is generated by scripts/process-messages/index.js. Do not edit! */


	/**
	 * Reading a derived belonging to a now-destroyed effect may result in stale values
	 */
	function derived_inert() {
		{
			console.warn(`https://svelte.dev/e/derived_inert`);
		}
	}

	/**
	 * %handler% should be a function. Did you mean to %suggestion%?
	 * @param {string} handler
	 * @param {string} suggestion
	 */
	function event_handler_invalid(handler, suggestion) {
		{
			console.warn(`https://svelte.dev/e/event_handler_invalid`);
		}
	}

	/**
	 * %parent% passed property `%prop%` to %child% with `bind:`, but its parent component %owner% did not declare `%prop%` as a binding. Consider creating a binding between %owner% and %parent% (e.g. `bind:%prop%={...}` instead of `%prop%={...}`)
	 * @param {string} parent
	 * @param {string} prop
	 * @param {string} child
	 * @param {string} owner
	 */
	function ownership_invalid_binding(parent, prop, child, owner) {
		{
			console.warn(`https://svelte.dev/e/ownership_invalid_binding`);
		}
	}

	/**
	 * Mutating unbound props (`%name%`, at %location%) is strongly discouraged. Consider using `bind:%prop%={...}` in %parent% (or using a callback) instead
	 * @param {string} name
	 * @param {string} location
	 * @param {string} prop
	 * @param {string} parent
	 */
	function ownership_invalid_mutation(name, location, prop, parent) {
		{
			console.warn(`https://svelte.dev/e/ownership_invalid_mutation`);
		}
	}

	/**
	 * Reactive `$state(...)` proxies and the values they proxy have different identities. Because of this, comparisons with `%operator%` will produce unexpected results
	 * @param {string} operator
	 */
	function state_proxy_equality_mismatch(operator) {
		{
			console.warn(`https://svelte.dev/e/state_proxy_equality_mismatch`);
		}
	}

	/**
	 * A `<svelte:boundary>` `reset` function only resets the boundary the first time it is called
	 */
	function svelte_boundary_reset_noop() {
		{
			console.warn(`https://svelte.dev/e/svelte_boundary_reset_noop`);
		}
	}

	/** @import { TemplateNode } from '#client' */


	/** @param {TemplateNode} node */
	function reset(node) {
		return;
	}

	/** @import { Equals } from '#client' */

	/** @type {Equals} */
	function equals$1(value) {
		return value === this.v;
	}

	/**
	 * @param {unknown} a
	 * @param {unknown} b
	 * @returns {boolean}
	 */
	function safe_not_equal(a, b) {
		return a != a
			? b == b
			: a !== b || (a !== null && typeof a === 'object') || typeof a === 'function';
	}

	/** @type {Equals} */
	function safe_equals(value) {
		return !safe_not_equal(value, this.v);
	}

	/** True if experimental.async=true */
	/** True if we're not certain that we only have Svelte 5 code in the compilation */
	let legacy_mode_flag = false;
	/** True if $inspect.trace is used */
	let tracing_mode_flag = false;

	function enable_legacy_mode_flag() {
		legacy_mode_flag = true;
	}

	/** @import { Derived, Reaction, Value } from '#client' */

	/**
	 * @param {Value} source
	 * @param {string} label
	 */
	function tag(source, label) {
		source.label = label;
		tag_proxy(source.v, label);

		return source;
	}

	/**
	 * @param {unknown} value
	 * @param {string} label
	 */
	function tag_proxy(value, label) {
		// @ts-expect-error
		value?.[PROXY_PATH_SYMBOL]?.(label);
		return value;
	}

	/** @import { ComponentContext, DevStackEntry, Effect } from '#client' */

	/** @type {ComponentContext | null} */
	let component_context = null;

	/** @param {ComponentContext | null} context */
	function set_component_context(context) {
		component_context = context;
	}

	/** @type {DevStackEntry | null} */
	let dev_stack = null;

	/**
	 * Execute a callback with a new dev stack entry
	 * @param {() => any} callback - Function to execute
	 * @param {DevStackEntry['type']} type - Type of block/component
	 * @param {any} component - Component function
	 * @param {number} line - Line number
	 * @param {number} column - Column number
	 * @param {Record<string, any>} [additional] - Any additional properties to add to the dev stack entry
	 * @returns {any}
	 */
	function add_svelte_meta(callback, type, component, line, column, additional) {
		const parent = dev_stack;

		dev_stack = {
			type,
			file: component[FILENAME],
			line,
			column,
			parent,
			...additional
		};

		try {
			return callback();
		} finally {
			dev_stack = parent;
		}
	}

	/**
	 * @param {Record<string, unknown>} props
	 * @param {any} runes
	 * @param {Function} [fn]
	 * @returns {void}
	 */
	function push(props, runes = false, fn) {
		component_context = {
			p: component_context,
			i: false,
			c: null,
			e: null,
			s: props,
			x: null,
			r: /** @type {Effect} */ (active_effect),
			l: legacy_mode_flag && !runes ? { s: null, u: null, $: [] } : null
		};
	}

	/**
	 * @template {Record<string, any>} T
	 * @param {T} [component]
	 * @returns {T}
	 */
	function pop(component) {
		var context = /** @type {ComponentContext} */ (component_context);
		var effects = context.e;

		if (effects !== null) {
			context.e = null;

			for (var fn of effects) {
				create_user_effect(fn);
			}
		}

		if (component !== undefined) {
			context.x = component;
		}

		context.i = true;

		component_context = context.p;

		return component ?? /** @type {T} */ ({});
	}

	/** @returns {boolean} */
	function is_runes() {
		return !legacy_mode_flag || (component_context !== null && component_context.l === null);
	}

	/** @type {Array<() => void>} */
	let micro_tasks = [];

	function run_micro_tasks() {
		var tasks = micro_tasks;
		micro_tasks = [];
		run_all(tasks);
	}

	/**
	 * @param {() => void} fn
	 */
	function queue_micro_task(fn) {
		if (micro_tasks.length === 0 && !is_flushing_sync) {
			var tasks = micro_tasks;
			queueMicrotask(() => {
				// If this is false, a flushSync happened in the meantime. Do _not_ run new scheduled microtasks in that case
				// as the ordering of microtasks would be broken at that point - consider this case:
				// - queue_micro_task schedules microtask A to flush task X
				// - synchronously after, flushSync runs, processing task X
				// - synchronously after, some other microtask B is scheduled, but not through queue_micro_task but for example a Promise.resolve() in user code
				// - synchronously after, queue_micro_task schedules microtask C to flush task Y
				// - one tick later, microtask A now resolves, flushing task Y before microtask B, which is incorrect
				// This if check prevents that race condition (that realistically will only happen in tests)
				if (tasks === micro_tasks) run_micro_tasks();
			});
		}

		micro_tasks.push(fn);
	}

	/**
	 * Synchronously run any queued tasks.
	 */
	function flush_tasks() {
		while (micro_tasks.length > 0) {
			run_micro_tasks();
		}
	}

	/** @import { Derived, Effect } from '#client' */
	/** @import { Boundary } from './dom/blocks/boundary.js' */

	/**
	 * @param {unknown} error
	 */
	function handle_error(error) {
		var effect = active_effect;

		// for unowned deriveds, don't throw until we read the value
		if (effect === null) {
			/** @type {Derived} */ (active_reaction).f |= ERROR_VALUE;
			return error;
		}

		// if the error occurred while creating this subtree, we let it
		// bubble up until it hits a boundary that can handle it, unless
		// it's an $effect in which case it doesn't run immediately
		if ((effect.f & REACTION_RAN) === 0 && (effect.f & EFFECT) === 0) {

			throw error;
		}

		// otherwise we bubble up the effect tree ourselves
		invoke_error_boundary(error, effect);
	}

	/**
	 * @param {unknown} error
	 * @param {Effect | null} effect
	 */
	function invoke_error_boundary(error, effect) {
		while (effect !== null) {
			if ((effect.f & BOUNDARY_EFFECT) !== 0) {
				if ((effect.f & REACTION_RAN) === 0) {
					// we are still creating the boundary effect
					throw error;
				}

				try {
					/** @type {Boundary} */ (effect.b).error(error);
					return;
				} catch (e) {
					error = e;
				}
			}

			effect = effect.parent;
		}

		throw error;
	}

	/** @import { Derived, Signal } from '#client' */

	const STATUS_MASK = -7169;

	/**
	 * @param {Signal} signal
	 * @param {number} status
	 */
	function set_signal_status(signal, status) {
		signal.f = (signal.f & STATUS_MASK) | status;
	}

	/**
	 * Set a derived's status to CLEAN or MAYBE_DIRTY based on its connection state.
	 * @param {Derived} derived
	 */
	function update_derived_status(derived) {
		// Only mark as MAYBE_DIRTY if disconnected and has dependencies.
		if ((derived.f & CONNECTED) !== 0 || derived.deps === null) {
			set_signal_status(derived, CLEAN);
		} else {
			set_signal_status(derived, MAYBE_DIRTY);
		}
	}

	/** @import { Derived, Effect, Value } from '#client' */

	/**
	 * @param {Value[] | null} deps
	 */
	function clear_marked(deps) {
		if (deps === null) return;

		for (const dep of deps) {
			if ((dep.f & DERIVED) === 0 || (dep.f & WAS_MARKED) === 0) {
				continue;
			}

			dep.f ^= WAS_MARKED;

			clear_marked(/** @type {Derived} */ (dep).deps);
		}
	}

	/**
	 * @param {Effect} effect
	 * @param {Set<Effect>} dirty_effects
	 * @param {Set<Effect>} maybe_dirty_effects
	 */
	function defer_effect(effect, dirty_effects, maybe_dirty_effects) {
		if ((effect.f & DIRTY) !== 0) {
			dirty_effects.add(effect);
		} else if ((effect.f & MAYBE_DIRTY) !== 0) {
			maybe_dirty_effects.add(effect);
		}

		// Since we're not executing these effects now, we need to clear any WAS_MARKED flags
		// so that other batches can correctly reach these effects during their own traversal
		clear_marked(effect.deps);

		// mark as clean so they get scheduled if they depend on pending async state
		set_signal_status(effect, CLEAN);
	}

	/** @import { Readable } from './public' */

	/**
	 * @template T
	 * @param {Readable<T> | null | undefined} store
	 * @param {(value: T) => void} run
	 * @param {(value: T) => void} [invalidate]
	 * @returns {() => void}
	 */
	function subscribe_to_store(store, run, invalidate) {
		if (store == null) {
			// @ts-expect-error
			run(undefined);

			return noop;
		}

		// Svelte store takes a private second argument
		// StartStopNotifier could mutate state, and we want to silence the corresponding validation error
		const unsub = untrack(() =>
			store.subscribe(
				run,
				// @ts-expect-error
				invalidate
			)
		);

		// Also support RxJS
		// @ts-expect-error TODO fix this in the types?
		return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
	}

	/** @import { Readable, StartStopNotifier, Subscriber, Unsubscriber, Updater, Writable } from '../public.js' */
	/** @import { Stores, StoresValues, SubscribeInvalidateTuple } from '../private.js' */

	/**
	 * @type {Array<SubscribeInvalidateTuple<any> | any>}
	 */
	const subscriber_queue = [];

	/**
	 * Create a `Writable` store that allows both updating and reading by subscription.
	 *
	 * @template T
	 * @param {T} [value] initial value
	 * @param {StartStopNotifier<T>} [start]
	 * @returns {Writable<T>}
	 */
	function writable(value, start = noop) {
		/** @type {Unsubscriber | null} */
		let stop = null;

		/** @type {Set<SubscribeInvalidateTuple<T>>} */
		const subscribers = new Set();

		/**
		 * @param {T} new_value
		 * @returns {void}
		 */
		function set(new_value) {
			if (safe_not_equal(value, new_value)) {
				value = new_value;
				if (stop) {
					// store is ready
					const run_queue = !subscriber_queue.length;
					for (const subscriber of subscribers) {
						subscriber[1]();
						subscriber_queue.push(subscriber, value);
					}
					if (run_queue) {
						for (let i = 0; i < subscriber_queue.length; i += 2) {
							subscriber_queue[i][0](subscriber_queue[i + 1]);
						}
						subscriber_queue.length = 0;
					}
				}
			}
		}

		/**
		 * @param {Updater<T>} fn
		 * @returns {void}
		 */
		function update(fn) {
			set(fn(/** @type {T} */ (value)));
		}

		/**
		 * @param {Subscriber<T>} run
		 * @param {() => void} [invalidate]
		 * @returns {Unsubscriber}
		 */
		function subscribe(run, invalidate = noop) {
			/** @type {SubscribeInvalidateTuple<T>} */
			const subscriber = [run, invalidate];
			subscribers.add(subscriber);
			if (subscribers.size === 1) {
				stop = start(set, update) || noop;
			}
			run(/** @type {T} */ (value));
			return () => {
				subscribers.delete(subscriber);
				if (subscribers.size === 0 && stop) {
					stop();
					stop = null;
				}
			};
		}
		return { set, update, subscribe };
	}

	/**
	 * Get the current value from a store by subscribing and immediately unsubscribing.
	 *
	 * @template T
	 * @param {Readable<T>} store
	 * @returns {T}
	 */
	function get$1(store) {
		let value;
		subscribe_to_store(store, (_) => (value = _))();
		// @ts-expect-error
		return value;
	}

	/** @import { StoreReferencesContainer } from '#client' */
	/** @import { Store } from '#shared' */

	/**
	 * Whether or not the prop currently being read is a store binding, as in
	 * `<Child bind:x={$y} />`. If it is, we treat the prop as mutable even in
	 * runes mode, and skip `binding_property_non_reactive` validation
	 */
	let is_store_binding = false;

	let IS_UNMOUNTED = Symbol();

	/**
	 * Gets the current value of a store. If the store isn't subscribed to yet, it will create a proxy
	 * signal that will be updated when the store is. The store references container is needed to
	 * track reassignments to stores and to track the correct component context.
	 * @template V
	 * @param {Store<V> | null | undefined} store
	 * @param {string} store_name
	 * @param {StoreReferencesContainer} stores
	 * @returns {V}
	 */
	function store_get(store, store_name, stores) {
		const entry = (stores[store_name] ??= {
			store: null,
			source: mutable_source(undefined),
			unsubscribe: noop
		});

		// if the component that setup this is already unmounted we don't want to register a subscription
		if (entry.store !== store && !(IS_UNMOUNTED in stores)) {
			entry.unsubscribe();
			entry.store = store ?? null;

			if (store == null) {
				entry.source.v = undefined; // see synchronous callback comment below
				entry.unsubscribe = noop;
			} else {
				var is_synchronous_callback = true;

				entry.unsubscribe = subscribe_to_store(store, (v) => {
					if (is_synchronous_callback) {
						// If the first updates to the store value (possibly multiple of them) are synchronously
						// inside a derived, we will hit the `state_unsafe_mutation` error if we `set` the value
						entry.source.v = v;
					} else {
						set(entry.source, v);
					}
				});

				is_synchronous_callback = false;
			}
		}

		// if the component that setup this stores is already unmounted the source will be out of sync
		// so we just use the `get` for the stores, less performant but it avoids to create a memory leak
		// and it will keep the value consistent
		if (store && IS_UNMOUNTED in stores) {
			return get$1(store);
		}

		return get(entry.source);
	}

	/**
	 * Unsubscribes from all auto-subscribed stores on destroy
	 * @returns {[StoreReferencesContainer, ()=>void]}
	 */
	function setup_stores() {
		/** @type {StoreReferencesContainer} */
		const stores = {};

		function cleanup() {
			teardown(() => {
				for (var store_name in stores) {
					const ref = stores[store_name];
					ref.unsubscribe();
				}
				define_property(stores, IS_UNMOUNTED, {
					enumerable: false,
					value: true
				});
			});
		}

		return [stores, cleanup];
	}

	/**
	 * Returns a tuple that indicates whether `fn()` reads a prop that is a store binding.
	 * Used to prevent `binding_property_non_reactive` validation false positives and
	 * ensure that these props are treated as mutable even in runes mode
	 * @template T
	 * @param {() => T} fn
	 * @returns {[T, boolean]}
	 */
	function capture_store_binding(fn) {
		var previous_is_store_binding = is_store_binding;

		try {
			is_store_binding = false;
			return [fn(), is_store_binding];
		} finally {
			is_store_binding = previous_is_store_binding;
		}
	}

	/** @import { Fork } from 'svelte' */
	/** @import { Derived, Effect, Reaction, Source, Value } from '#client' */

	/** @type {Set<Batch>} */
	const batches = new Set();

	/** @type {Batch | null} */
	let current_batch = null;

	/**
	 * When time travelling (i.e. working in one batch, while other batches
	 * still have ongoing work), we ignore the real values of affected
	 * signals in favour of their values within the batch
	 * @type {Map<Value, any> | null}
	 */
	let batch_values = null;

	/** @type {Effect | null} */
	let last_scheduled_effect = null;

	let is_flushing_sync = false;
	let is_processing = false;

	/**
	 * During traversal, this is an array. Newly created effects are (if not immediately
	 * executed) pushed to this array, rather than going through the scheduling
	 * rigamarole that would cause another turn of the flush loop.
	 * @type {Effect[] | null}
	 */
	let collected_effects = null;

	/**
	 * An array of effects that are marked during traversal as a result of a `set`
	 * (not `internal_set`) call. These will be added to the next batch and
	 * trigger another `batch.process()`
	 * @type {Effect[] | null}
	 * @deprecated when we get rid of legacy mode and stores, we can get rid of this
	 */
	let legacy_updates = null;

	var flush_count = 0;

	let uid = 1;

	class Batch {
		id = uid++;

		/**
		 * The current values of any signals that are updated in this batch.
		 * Tuple format: [value, is_derived] (note: is_derived is false for deriveds, too, if they were overridden via assignment)
		 * They keys of this map are identical to `this.#previous`
		 * @type {Map<Value, [any, boolean]>}
		 */
		current = new Map();

		/**
		 * The values of any signals (sources and deriveds) that are updated in this batch _before_ those updates took place.
		 * They keys of this map are identical to `this.#current`
		 * @type {Map<Value, any>}
		 */
		previous = new Map();

		/**
		 * When the batch is committed (and the DOM is updated), we need to remove old branches
		 * and append new ones by calling the functions added inside (if/each/key/etc) blocks
		 * @type {Set<(batch: Batch) => void>}
		 */
		#commit_callbacks = new Set();

		/**
		 * If a fork is discarded, we need to destroy any effects that are no longer needed
		 * @type {Set<(batch: Batch) => void>}
		 */
		#discard_callbacks = new Set();

		/**
		 * Callbacks that should run only when a fork is committed.
		 * @type {Set<(batch: Batch) => void>}
		 */
		#fork_commit_callbacks = new Set();

		/**
		 * Async effects that are currently in flight
		 * @type {Map<Effect, number>}
		 */
		#pending = new Map();

		/**
		 * Async effects that are currently in flight, _not_ inside a pending boundary
		 * @type {Map<Effect, number>}
		 */
		#blocking_pending = new Map();

		/**
		 * A deferred that resolves when the batch is committed, used with `settled()`
		 * TODO replace with Promise.withResolvers once supported widely enough
		 * @type {{ promise: Promise<void>, resolve: (value?: any) => void, reject: (reason: unknown) => void } | null}
		 */
		#deferred = null;

		/**
		 * The root effects that need to be flushed
		 * @type {Effect[]}
		 */
		#roots = [];

		/**
		 * Effects created while this batch was active.
		 * @type {Effect[]}
		 */
		#new_effects = [];

		/**
		 * Deferred effects (which run after async work has completed) that are DIRTY
		 * @type {Set<Effect>}
		 */
		#dirty_effects = new Set();

		/**
		 * Deferred effects that are MAYBE_DIRTY
		 * @type {Set<Effect>}
		 */
		#maybe_dirty_effects = new Set();

		/**
		 * A map of branches that still exist, but will be destroyed when this batch
		 * is committed — we skip over these during `process`.
		 * The value contains child effects that were dirty/maybe_dirty before being reset,
		 * so they can be rescheduled if the branch survives.
		 * @type {Map<Effect, { d: Effect[], m: Effect[] }>}
		 */
		#skipped_branches = new Map();

		/**
		 * Inverse of #skipped_branches which we need to tell prior batches to unskip them when committing
		 * @type {Set<Effect>}
		 */
		#unskipped_branches = new Set();

		is_fork = false;

		#decrement_queued = false;

		/** @type {Set<Batch>} */
		#blockers = new Set();

		#is_deferred() {
			return this.is_fork || this.#blocking_pending.size > 0;
		}

		#is_blocked() {
			for (const batch of this.#blockers) {
				for (const effect of batch.#blocking_pending.keys()) {
					var skipped = false;
					var e = effect;

					while (e.parent !== null) {
						if (this.#skipped_branches.has(e)) {
							skipped = true;
							break;
						}

						e = e.parent;
					}

					if (!skipped) {
						return true;
					}
				}
			}

			return false;
		}

		/**
		 * Add an effect to the #skipped_branches map and reset its children
		 * @param {Effect} effect
		 */
		skip_effect(effect) {
			if (!this.#skipped_branches.has(effect)) {
				this.#skipped_branches.set(effect, { d: [], m: [] });
			}
			this.#unskipped_branches.delete(effect);
		}

		/**
		 * Remove an effect from the #skipped_branches map and reschedule
		 * any tracked dirty/maybe_dirty child effects
		 * @param {Effect} effect
		 * @param {(e: Effect) => void} callback
		 */
		unskip_effect(effect, callback = (e) => this.schedule(e)) {
			var tracked = this.#skipped_branches.get(effect);
			if (tracked) {
				this.#skipped_branches.delete(effect);

				for (var e of tracked.d) {
					set_signal_status(e, DIRTY);
					callback(e);
				}

				for (e of tracked.m) {
					set_signal_status(e, MAYBE_DIRTY);
					callback(e);
				}
			}
			this.#unskipped_branches.add(effect);
		}

		#process() {
			if (flush_count++ > 1000) {
				batches.delete(this);
				infinite_loop_guard();
			}

			// we only reschedule previously-deferred effects if we expect
			// to be able to run them after processing the batch
			if (!this.#is_deferred()) {
				for (const e of this.#dirty_effects) {
					this.#maybe_dirty_effects.delete(e);
					set_signal_status(e, DIRTY);
					this.schedule(e);
				}

				for (const e of this.#maybe_dirty_effects) {
					set_signal_status(e, MAYBE_DIRTY);
					this.schedule(e);
				}
			}

			const roots = this.#roots;
			this.#roots = [];

			this.apply();

			/** @type {Effect[]} */
			var effects = (collected_effects = []);

			/** @type {Effect[]} */
			var render_effects = [];

			/**
			 * @type {Effect[]}
			 * @deprecated when we get rid of legacy mode and stores, we can get rid of this
			 */
			var updates = (legacy_updates = []);

			for (const root of roots) {
				try {
					this.#traverse(root, effects, render_effects);
				} catch (e) {
					reset_all(root);
					throw e;
				}
			}

			// any writes should take effect in a subsequent batch
			current_batch = null;

			if (updates.length > 0) {
				var batch = Batch.ensure();
				for (const e of updates) {
					batch.schedule(e);
				}
			}

			collected_effects = null;
			legacy_updates = null;

			if (this.#is_deferred() || this.#is_blocked()) {
				this.#defer_effects(render_effects);
				this.#defer_effects(effects);

				for (const [e, t] of this.#skipped_branches) {
					reset_branch(e, t);
				}
			} else {
				if (this.#pending.size === 0) {
					batches.delete(this);
				}

				// clear effects. Those that are still needed will be rescheduled through unskipping the skipped branches.
				this.#dirty_effects.clear();
				this.#maybe_dirty_effects.clear();

				// append/remove branches
				for (const fn of this.#commit_callbacks) fn(this);
				this.#commit_callbacks.clear();
				flush_queued_effects(render_effects);
				flush_queued_effects(effects);

				this.#deferred?.resolve();
			}

			var next_batch = /** @type {Batch | null} */ (/** @type {unknown} */ (current_batch));

			// Edge case: During traversal new branches might create effects that run immediately and set state,
			// causing an effect and therefore a root to be scheduled again. We need to traverse the current batch
			// once more in that case - most of the time this will just clean up dirty branches.
			if (this.#roots.length > 0) {
				const batch = (next_batch ??= this);
				batch.#roots.push(...this.#roots.filter((r) => !batch.#roots.includes(r)));
			}

			if (next_batch !== null) {
				batches.add(next_batch);

				next_batch.#process();
			}
		}

		/**
		 * Traverse the effect tree, executing effects or stashing
		 * them for later execution as appropriate
		 * @param {Effect} root
		 * @param {Effect[]} effects
		 * @param {Effect[]} render_effects
		 */
		#traverse(root, effects, render_effects) {
			root.f ^= CLEAN;

			var effect = root.first;

			while (effect !== null) {
				var flags = effect.f;
				var is_branch = (flags & (BRANCH_EFFECT | ROOT_EFFECT)) !== 0;
				var is_skippable_branch = is_branch && (flags & CLEAN) !== 0;

				var skip = is_skippable_branch || (flags & INERT) !== 0 || this.#skipped_branches.has(effect);

				if (!skip && effect.fn !== null) {
					if (is_branch) {
						effect.f ^= CLEAN;
					} else if ((flags & EFFECT) !== 0) {
						effects.push(effect);
					} else if (is_dirty(effect)) {
						if ((flags & BLOCK_EFFECT) !== 0) this.#maybe_dirty_effects.add(effect);
						update_effect(effect);
					}

					var child = effect.first;

					if (child !== null) {
						effect = child;
						continue;
					}
				}

				while (effect !== null) {
					var next = effect.next;

					if (next !== null) {
						effect = next;
						break;
					}

					effect = effect.parent;
				}
			}
		}

		/**
		 * @param {Effect[]} effects
		 */
		#defer_effects(effects) {
			for (var i = 0; i < effects.length; i += 1) {
				defer_effect(effects[i], this.#dirty_effects, this.#maybe_dirty_effects);
			}
		}

		/**
		 * Associate a change to a given source with the current
		 * batch, noting its previous and current values
		 * @param {Value} source
		 * @param {any} value
		 * @param {boolean} [is_derived]
		 */
		capture(source, value, is_derived = false) {
			if (source.v !== UNINITIALIZED && !this.previous.has(source)) {
				this.previous.set(source, source.v);
			}

			// Don't save errors in `batch_values`, or they won't be thrown in `runtime.js#get`
			if ((source.f & ERROR_VALUE) === 0) {
				this.current.set(source, [value, is_derived]);
				batch_values?.set(source, value);
			}

			if (!this.is_fork) {
				source.v = value;
			}
		}

		activate() {
			current_batch = this;
		}

		deactivate() {
			current_batch = null;
			batch_values = null;
		}

		flush() {

			try {
				is_processing = true;
				current_batch = this;

				this.#process();
			} finally {
				flush_count = 0;
				last_scheduled_effect = null;
				collected_effects = null;
				legacy_updates = null;
				is_processing = false;

				current_batch = null;
				batch_values = null;

				old_values.clear();
			}
		}

		discard() {
			for (const fn of this.#discard_callbacks) fn(this);
			this.#discard_callbacks.clear();
			this.#fork_commit_callbacks.clear();

			batches.delete(this);
		}

		/**
		 * @param {Effect} effect
		 */
		register_created_effect(effect) {
			this.#new_effects.push(effect);
		}

		#commit() {
			// If there are other pending batches, they now need to be 'rebased' —
			// in other words, we re-run block/async effects with the newly
			// committed state, unless the batch in question has a more
			// recent value for a given source
			for (const batch of batches) {
				var is_earlier = batch.id < this.id;

				/** @type {Source[]} */
				var sources = [];

				for (const [source, [value, is_derived]] of this.current) {
					if (batch.current.has(source)) {
						var batch_value = /** @type {[any, boolean]} */ (batch.current.get(source))[0]; // faster than destructuring

						if (is_earlier && value !== batch_value) {
							// bring the value up to date
							batch.current.set(source, [value, is_derived]);
						} else {
							// same value or later batch has more recent value,
							// no need to re-run these effects
							continue;
						}
					}

					sources.push(source);
				}

				// Re-run async/block effects that depend on distinct values changed in both batches
				var others = [...batch.current.keys()].filter((s) => !this.current.has(s));

				if (others.length === 0) {
					if (is_earlier) {
						// this batch is now obsolete and can be discarded
						batch.discard();
					}
				} else if (sources.length > 0) {

					// A batch was unskipped in a later batch -> tell prior batches to unskip it, too
					if (is_earlier) {
						for (const unskipped of this.#unskipped_branches) {
							batch.unskip_effect(unskipped, (e) => {
								if ((e.f & (BLOCK_EFFECT | ASYNC)) !== 0) {
									batch.schedule(e);
								} else {
									batch.#defer_effects([e]);
								}
							});
						}
					}

					batch.activate();

					/** @type {Set<Value>} */
					var marked = new Set();

					/** @type {Map<Reaction, boolean>} */
					var checked = new Map();

					for (var source of sources) {
						mark_effects(source, others, marked, checked);
					}

					checked = new Map();
					var current_unequal = [...batch.current.keys()].filter((c) =>
						this.current.has(c) ? /** @type {[any, boolean]} */ (this.current.get(c))[0] !== c : true
					);

					for (const effect of this.#new_effects) {
						if (
							(effect.f & (DESTROYED | INERT | EAGER_EFFECT)) === 0 &&
							depends_on(effect, current_unequal, checked)
						) {
							if ((effect.f & (ASYNC | BLOCK_EFFECT)) !== 0) {
								set_signal_status(effect, DIRTY);
								batch.schedule(effect);
							} else {
								batch.#dirty_effects.add(effect);
							}
						}
					}

					// Only apply and traverse when we know we triggered async work with marking the effects
					if (batch.#roots.length > 0) {
						batch.apply();

						for (var root of batch.#roots) {
							batch.#traverse(root, [], []);
						}

						batch.#roots = [];
					}

					batch.deactivate();
				}
			}

			for (const batch of batches) {
				if (batch.#blockers.has(this)) {
					batch.#blockers.delete(this);

					if (batch.#blockers.size === 0 && !batch.#is_deferred()) {
						batch.activate();
						batch.#process();
					}
				}
			}
		}

		/**
		 * @param {boolean} blocking
		 * @param {Effect} effect
		 */
		increment(blocking, effect) {
			let pending_count = this.#pending.get(effect) ?? 0;
			this.#pending.set(effect, pending_count + 1);

			if (blocking) {
				let blocking_pending_count = this.#blocking_pending.get(effect) ?? 0;
				this.#blocking_pending.set(effect, blocking_pending_count + 1);
			}
		}

		/**
		 * @param {boolean} blocking
		 * @param {Effect} effect
		 * @param {boolean} skip - whether to skip updates (because this is triggered by a stale reaction)
		 */
		decrement(blocking, effect, skip) {
			let pending_count = this.#pending.get(effect) ?? 0;

			if (pending_count === 1) {
				this.#pending.delete(effect);
			} else {
				this.#pending.set(effect, pending_count - 1);
			}

			if (blocking) {
				let blocking_pending_count = this.#blocking_pending.get(effect) ?? 0;

				if (blocking_pending_count === 1) {
					this.#blocking_pending.delete(effect);
				} else {
					this.#blocking_pending.set(effect, blocking_pending_count - 1);
				}
			}

			if (this.#decrement_queued || skip) return;
			this.#decrement_queued = true;

			queue_micro_task(() => {
				this.#decrement_queued = false;
				this.flush();
			});
		}

		/**
		 * @param {Set<Effect>} dirty_effects
		 * @param {Set<Effect>} maybe_dirty_effects
		 */
		transfer_effects(dirty_effects, maybe_dirty_effects) {
			for (const e of dirty_effects) {
				this.#dirty_effects.add(e);
			}

			for (const e of maybe_dirty_effects) {
				this.#maybe_dirty_effects.add(e);
			}

			dirty_effects.clear();
			maybe_dirty_effects.clear();
		}

		/** @param {(batch: Batch) => void} fn */
		oncommit(fn) {
			this.#commit_callbacks.add(fn);
		}

		/** @param {(batch: Batch) => void} fn */
		ondiscard(fn) {
			this.#discard_callbacks.add(fn);
		}

		/** @param {(batch: Batch) => void} fn */
		on_fork_commit(fn) {
			this.#fork_commit_callbacks.add(fn);
		}

		run_fork_commit_callbacks() {
			for (const fn of this.#fork_commit_callbacks) fn(this);
			this.#fork_commit_callbacks.clear();
		}

		settled() {
			return (this.#deferred ??= deferred()).promise;
		}

		static ensure() {
			if (current_batch === null) {
				const batch = (current_batch = new Batch());

				if (!is_processing) {
					batches.add(current_batch);

					if (!is_flushing_sync) {
						queue_micro_task(() => {
							if (current_batch !== batch) {
								// a flushSync happened in the meantime
								return;
							}

							batch.flush();
						});
					}
				}
			}

			return current_batch;
		}

		apply() {
			{
				batch_values = null;
				return;
			}
		}

		/**
		 *
		 * @param {Effect} effect
		 */
		schedule(effect) {
			last_scheduled_effect = effect;

			// defer render effects inside a pending boundary
			// TODO the `REACTION_RAN` check is only necessary because of legacy `$:` effects AFAICT — we can remove later
			if (
				effect.b?.is_pending &&
				(effect.f & (EFFECT | RENDER_EFFECT | MANAGED_EFFECT)) !== 0 &&
				(effect.f & REACTION_RAN) === 0
			) {
				effect.b.defer_effect(effect);
				return;
			}

			var e = effect;

			while (e.parent !== null) {
				e = e.parent;
				var flags = e.f;

				// if the effect is being scheduled because a parent (each/await/etc) block
				// updated an internal source, or because a branch is being unskipped,
				// bail out or we'll cause a second flush
				if (collected_effects !== null && e === active_effect) {

					// in sync mode, render effects run during traversal. in an extreme edge case
					// — namely that we're setting a value inside a derived read during traversal —
					// they can be made dirty after they have already been visited, in which
					// case we shouldn't bail out. we also shouldn't bail out if we're
					// updating a store inside a `$:`, since this might invalidate
					// effects that were already visited
					if (
						(active_reaction === null || (active_reaction.f & DERIVED) === 0) &&
						true
					) {
						return;
					}
				}

				if ((flags & (ROOT_EFFECT | BRANCH_EFFECT)) !== 0) {
					if ((flags & CLEAN) === 0) {
						// branch is already dirty, bail
						return;
					}

					e.f ^= CLEAN;
				}
			}

			this.#roots.push(e);
		}
	}

	// TODO Svelte@6 think about removing the callback argument.
	/**
	 * Synchronously flush any pending updates.
	 * Returns void if no callback is provided, otherwise returns the result of calling the callback.
	 * @template [T=void]
	 * @param {(() => T) | undefined} [fn]
	 * @returns {T}
	 */
	function flushSync(fn) {
		var was_flushing_sync = is_flushing_sync;
		is_flushing_sync = true;

		try {
			var result;

			if (fn) ;

			while (true) {
				flush_tasks();

				if (current_batch === null) {
					return /** @type {T} */ (result);
				}

				current_batch.flush();
			}
		} finally {
			is_flushing_sync = was_flushing_sync;
		}
	}

	function infinite_loop_guard() {

		try {
			effect_update_depth_exceeded();
		} catch (error) {

			// Best effort: invoke the boundary nearest the most recent
			// effect and hope that it's relevant to the infinite loop
			invoke_error_boundary(error, last_scheduled_effect);
		}
	}

	/** @type {Set<Effect> | null} */
	let eager_block_effects = null;

	/**
	 * @param {Array<Effect>} effects
	 * @returns {void}
	 */
	function flush_queued_effects(effects) {
		var length = effects.length;
		if (length === 0) return;

		var i = 0;

		while (i < length) {
			var effect = effects[i++];

			if ((effect.f & (DESTROYED | INERT)) === 0 && is_dirty(effect)) {
				eager_block_effects = new Set();

				update_effect(effect);

				// Effects with no dependencies or teardown do not get added to the effect tree.
				// Deferred effects (e.g. `$effect(...)`) _are_ added to the tree because we
				// don't know if we need to keep them until they are executed. Doing the check
				// here (rather than in `update_effect`) allows us to skip the work for
				// immediate effects.
				if (
					effect.deps === null &&
					effect.first === null &&
					effect.nodes === null &&
					effect.teardown === null &&
					effect.ac === null
				) {
					// remove this effect from the graph
					unlink_effect(effect);
				}

				// If update_effect() has a flushSync() in it, we may have flushed another flush_queued_effects(),
				// which already handled this logic and did set eager_block_effects to null.
				if (eager_block_effects?.size > 0) {
					old_values.clear();

					for (const e of eager_block_effects) {
						// Skip eager effects that have already been unmounted
						if ((e.f & (DESTROYED | INERT)) !== 0) continue;

						// Run effects in order from ancestor to descendant, else we could run into nullpointers
						/** @type {Effect[]} */
						const ordered_effects = [e];
						let ancestor = e.parent;
						while (ancestor !== null) {
							if (eager_block_effects.has(ancestor)) {
								eager_block_effects.delete(ancestor);
								ordered_effects.push(ancestor);
							}
							ancestor = ancestor.parent;
						}

						for (let j = ordered_effects.length - 1; j >= 0; j--) {
							const e = ordered_effects[j];
							// Skip eager effects that have already been unmounted
							if ((e.f & (DESTROYED | INERT)) !== 0) continue;
							update_effect(e);
						}
					}

					eager_block_effects.clear();
				}
			}
		}

		eager_block_effects = null;
	}

	/**
	 * This is similar to `mark_reactions`, but it only marks async/block effects
	 * depending on `value` and at least one of the other `sources`, so that
	 * these effects can re-run after another batch has been committed
	 * @param {Value} value
	 * @param {Source[]} sources
	 * @param {Set<Value>} marked
	 * @param {Map<Reaction, boolean>} checked
	 */
	function mark_effects(value, sources, marked, checked) {
		if (marked.has(value)) return;
		marked.add(value);

		if (value.reactions !== null) {
			for (const reaction of value.reactions) {
				const flags = reaction.f;

				if ((flags & DERIVED) !== 0) {
					mark_effects(/** @type {Derived} */ (reaction), sources, marked, checked);
				} else if (
					(flags & (ASYNC | BLOCK_EFFECT)) !== 0 &&
					(flags & DIRTY) === 0 &&
					depends_on(reaction, sources, checked)
				) {
					set_signal_status(reaction, DIRTY);
					schedule_effect(/** @type {Effect} */ (reaction));
				}
			}
		}
	}

	/**
	 * @param {Reaction} reaction
	 * @param {Source[]} sources
	 * @param {Map<Reaction, boolean>} checked
	 */
	function depends_on(reaction, sources, checked) {
		const depends = checked.get(reaction);
		if (depends !== undefined) return depends;

		if (reaction.deps !== null) {
			for (const dep of reaction.deps) {
				if (includes.call(sources, dep)) {
					return true;
				}

				if ((dep.f & DERIVED) !== 0 && depends_on(/** @type {Derived} */ (dep), sources, checked)) {
					checked.set(/** @type {Derived} */ (dep), true);
					return true;
				}
			}
		}

		checked.set(reaction, false);

		return false;
	}

	/**
	 * @param {Effect} effect
	 * @returns {void}
	 */
	function schedule_effect(effect) {
		/** @type {Batch} */ (current_batch).schedule(effect);
	}

	/**
	 * Mark all the effects inside a skipped branch CLEAN, so that
	 * they can be correctly rescheduled later. Tracks dirty and maybe_dirty
	 * effects so they can be rescheduled if the branch survives.
	 * @param {Effect} effect
	 * @param {{ d: Effect[], m: Effect[] }} tracked
	 */
	function reset_branch(effect, tracked) {
		// clean branch = nothing dirty inside, no need to traverse further
		if ((effect.f & BRANCH_EFFECT) !== 0 && (effect.f & CLEAN) !== 0) {
			return;
		}

		if ((effect.f & DIRTY) !== 0) {
			tracked.d.push(effect);
		} else if ((effect.f & MAYBE_DIRTY) !== 0) {
			tracked.m.push(effect);
		}

		set_signal_status(effect, CLEAN);

		var e = effect.first;
		while (e !== null) {
			reset_branch(e, tracked);
			e = e.next;
		}
	}

	/**
	 * Mark an entire effect tree clean following an error
	 * @param {Effect} effect
	 */
	function reset_all(effect) {
		set_signal_status(effect, CLEAN);

		var e = effect.first;
		while (e !== null) {
			reset_all(e);
			e = e.next;
		}
	}

	/**
	 * Returns a `subscribe` function that integrates external event-based systems with Svelte's reactivity.
	 * It's particularly useful for integrating with web APIs like `MediaQuery`, `IntersectionObserver`, or `WebSocket`.
	 *
	 * If `subscribe` is called inside an effect (including indirectly, for example inside a getter),
	 * the `start` callback will be called with an `update` function. Whenever `update` is called, the effect re-runs.
	 *
	 * If `start` returns a cleanup function, it will be called when the effect is destroyed.
	 *
	 * If `subscribe` is called in multiple effects, `start` will only be called once as long as the effects
	 * are active, and the returned teardown function will only be called when all effects are destroyed.
	 *
	 * It's best understood with an example. Here's an implementation of [`MediaQuery`](https://svelte.dev/docs/svelte/svelte-reactivity#MediaQuery):
	 *
	 * ```js
	 * import { createSubscriber } from 'svelte/reactivity';
	 * import { on } from 'svelte/events';
	 *
	 * export class MediaQuery {
	 * 	#query;
	 * 	#subscribe;
	 *
	 * 	constructor(query) {
	 * 		this.#query = window.matchMedia(`(${query})`);
	 *
	 * 		this.#subscribe = createSubscriber((update) => {
	 * 			// when the `change` event occurs, re-run any effects that read `this.current`
	 * 			const off = on(this.#query, 'change', update);
	 *
	 * 			// stop listening when all the effects are destroyed
	 * 			return () => off();
	 * 		});
	 * 	}
	 *
	 * 	get current() {
	 * 		// This makes the getter reactive, if read in an effect
	 * 		this.#subscribe();
	 *
	 * 		// Return the current state of the query, whether or not we're in an effect
	 * 		return this.#query.matches;
	 * 	}
	 * }
	 * ```
	 * @param {(update: () => void) => (() => void) | void} start
	 * @since 5.7.0
	 */
	function createSubscriber(start) {
		let subscribers = 0;
		let version = source(0);
		/** @type {(() => void) | void} */
		let stop;

		return () => {
			if (effect_tracking()) {
				get(version);

				render_effect(() => {
					if (subscribers === 0) {
						stop = untrack(() => start(() => increment(version)));
					}

					subscribers += 1;

					return () => {
						queue_micro_task(() => {
							// Only count down after a microtask, else we would reach 0 before our own render effect reruns,
							// but reach 1 again when the tick callback of the prior teardown runs. That would mean we
							// re-subcribe unnecessarily and create a memory leak because the old subscription is never cleaned up.
							subscribers -= 1;

							if (subscribers === 0) {
								stop?.();
								stop = undefined;
								// Increment the version to ensure any dependent deriveds are marked dirty when the subscription is picked up again later.
								// If we didn't do this then the comparison of write versions would determine that the derived has a later version than
								// the subscriber, and it would not be re-run.
								increment(version);
							}
						});
					};
				});
			}
		};
	}

	/** @import { Effect, Source, TemplateNode, } from '#client' */

	/**
	 * @typedef {{
	 * 	 onerror?: (error: unknown, reset: () => void) => void;
	 *   failed?: (anchor: Node, error: () => unknown, reset: () => () => void) => void;
	 *   pending?: (anchor: Node) => void;
	 * }} BoundaryProps
	 */

	var flags = EFFECT_TRANSPARENT | EFFECT_PRESERVED;

	/**
	 * @param {TemplateNode} node
	 * @param {BoundaryProps} props
	 * @param {((anchor: Node) => void)} children
	 * @param {((error: unknown) => unknown) | undefined} [transform_error]
	 * @returns {void}
	 */
	function boundary(node, props, children, transform_error) {
		new Boundary(node, props, children, transform_error);
	}

	class Boundary {
		/** @type {Boundary | null} */
		parent;

		is_pending = false;

		/**
		 * API-level transformError transform function. Transforms errors before they reach the `failed` snippet.
		 * Inherited from parent boundary, or defaults to identity.
		 * @type {(error: unknown) => unknown}
		 */
		transform_error;

		/** @type {TemplateNode} */
		#anchor;

		/** @type {TemplateNode | null} */
		#hydrate_open = null;

		/** @type {BoundaryProps} */
		#props;

		/** @type {((anchor: Node) => void)} */
		#children;

		/** @type {Effect} */
		#effect;

		/** @type {Effect | null} */
		#main_effect = null;

		/** @type {Effect | null} */
		#pending_effect = null;

		/** @type {Effect | null} */
		#failed_effect = null;

		/** @type {DocumentFragment | null} */
		#offscreen_fragment = null;

		#local_pending_count = 0;
		#pending_count = 0;
		#pending_count_update_queued = false;

		/** @type {Set<Effect>} */
		#dirty_effects = new Set();

		/** @type {Set<Effect>} */
		#maybe_dirty_effects = new Set();

		/**
		 * A source containing the number of pending async deriveds/expressions.
		 * Only created if `$effect.pending()` is used inside the boundary,
		 * otherwise updating the source results in needless `Batch.ensure()`
		 * calls followed by no-op flushes
		 * @type {Source<number> | null}
		 */
		#effect_pending = null;

		#effect_pending_subscriber = createSubscriber(() => {
			this.#effect_pending = source(this.#local_pending_count);

			return () => {
				this.#effect_pending = null;
			};
		});

		/**
		 * @param {TemplateNode} node
		 * @param {BoundaryProps} props
		 * @param {((anchor: Node) => void)} children
		 * @param {((error: unknown) => unknown) | undefined} [transform_error]
		 */
		constructor(node, props, children, transform_error) {
			this.#anchor = node;
			this.#props = props;

			this.#children = (anchor) => {
				var effect = /** @type {Effect} */ (active_effect);

				effect.b = this;
				effect.f |= BOUNDARY_EFFECT;

				children(anchor);
			};

			this.parent = /** @type {Effect} */ (active_effect).b;

			// Inherit transform_error from parent boundary, or use the provided one, or default to identity
			this.transform_error = transform_error ?? this.parent?.transform_error ?? ((e) => e);

			this.#effect = block(() => {
				{
					this.#render();
				}
			}, flags);
		}

		#hydrate_resolved_content() {
			try {
				this.#main_effect = branch(() => this.#children(this.#anchor));
			} catch (error) {
				this.error(error);
			}
		}

		/**
		 * @param {unknown} error The deserialized error from the server's hydration comment
		 */
		#hydrate_failed_content(error) {
			const failed = this.#props.failed;
			if (!failed) return;

			this.#failed_effect = branch(() => {
				failed(
					this.#anchor,
					() => error,
					() => () => {}
				);
			});
		}

		#hydrate_pending_content() {
			const pending = this.#props.pending;
			if (!pending) return;

			this.is_pending = true;
			this.#pending_effect = branch(() => pending(this.#anchor));

			queue_micro_task(() => {
				var fragment = (this.#offscreen_fragment = document.createDocumentFragment());
				var anchor = create_text();

				fragment.append(anchor);

				this.#main_effect = this.#run(() => {
					return branch(() => this.#children(anchor));
				});

				if (this.#pending_count === 0) {
					this.#anchor.before(fragment);
					this.#offscreen_fragment = null;

					pause_effect(/** @type {Effect} */ (this.#pending_effect), () => {
						this.#pending_effect = null;
					});

					this.#resolve(/** @type {Batch} */ (current_batch));
				}
			});
		}

		#render() {
			try {
				this.is_pending = this.has_pending_snippet();
				this.#pending_count = 0;
				this.#local_pending_count = 0;

				this.#main_effect = branch(() => {
					this.#children(this.#anchor);
				});

				if (this.#pending_count > 0) {
					var fragment = (this.#offscreen_fragment = document.createDocumentFragment());
					move_effect(this.#main_effect, fragment);

					const pending = /** @type {(anchor: Node) => void} */ (this.#props.pending);
					this.#pending_effect = branch(() => pending(this.#anchor));
				} else {
					this.#resolve(/** @type {Batch} */ (current_batch));
				}
			} catch (error) {
				this.error(error);
			}
		}

		/**
		 * @param {Batch} batch
		 */
		#resolve(batch) {
			this.is_pending = false;

			// any effects that were previously deferred should be transferred
			// to the batch, which will flush in the next microtask
			batch.transfer_effects(this.#dirty_effects, this.#maybe_dirty_effects);
		}

		/**
		 * Defer an effect inside a pending boundary until the boundary resolves
		 * @param {Effect} effect
		 */
		defer_effect(effect) {
			defer_effect(effect, this.#dirty_effects, this.#maybe_dirty_effects);
		}

		/**
		 * Returns `false` if the effect exists inside a boundary whose pending snippet is shown
		 * @returns {boolean}
		 */
		is_rendered() {
			return !this.is_pending && (!this.parent || this.parent.is_rendered());
		}

		has_pending_snippet() {
			return !!this.#props.pending;
		}

		/**
		 * @template T
		 * @param {() => T} fn
		 */
		#run(fn) {
			var previous_effect = active_effect;
			var previous_reaction = active_reaction;
			var previous_ctx = component_context;

			set_active_effect(this.#effect);
			set_active_reaction(this.#effect);
			set_component_context(this.#effect.ctx);

			try {
				Batch.ensure();
				return fn();
			} catch (e) {
				handle_error(e);
				return null;
			} finally {
				set_active_effect(previous_effect);
				set_active_reaction(previous_reaction);
				set_component_context(previous_ctx);
			}
		}

		/**
		 * Updates the pending count associated with the currently visible pending snippet,
		 * if any, such that we can replace the snippet with content once work is done
		 * @param {1 | -1} d
		 * @param {Batch} batch
		 */
		#update_pending_count(d, batch) {
			if (!this.has_pending_snippet()) {
				if (this.parent) {
					this.parent.#update_pending_count(d, batch);
				}

				// if there's no parent, we're in a scope with no pending snippet
				return;
			}

			this.#pending_count += d;

			if (this.#pending_count === 0) {
				this.#resolve(batch);

				if (this.#pending_effect) {
					pause_effect(this.#pending_effect, () => {
						this.#pending_effect = null;
					});
				}

				if (this.#offscreen_fragment) {
					this.#anchor.before(this.#offscreen_fragment);
					this.#offscreen_fragment = null;
				}
			}
		}

		/**
		 * Update the source that powers `$effect.pending()` inside this boundary,
		 * and controls when the current `pending` snippet (if any) is removed.
		 * Do not call from inside the class
		 * @param {1 | -1} d
		 * @param {Batch} batch
		 */
		update_pending_count(d, batch) {
			this.#update_pending_count(d, batch);

			this.#local_pending_count += d;

			if (!this.#effect_pending || this.#pending_count_update_queued) return;
			this.#pending_count_update_queued = true;

			queue_micro_task(() => {
				this.#pending_count_update_queued = false;
				if (this.#effect_pending) {
					internal_set(this.#effect_pending, this.#local_pending_count);
				}
			});
		}

		get_effect_pending() {
			this.#effect_pending_subscriber();
			return get(/** @type {Source<number>} */ (this.#effect_pending));
		}

		/** @param {unknown} error */
		error(error) {
			// If we have nothing to capture the error, or if we hit an error while
			// rendering the fallback, re-throw for another boundary to handle
			if (!this.#props.onerror && !this.#props.failed) {
				throw error;
			}

			if (current_batch?.is_fork) {
				if (this.#main_effect) current_batch.skip_effect(this.#main_effect);
				if (this.#pending_effect) current_batch.skip_effect(this.#pending_effect);
				if (this.#failed_effect) current_batch.skip_effect(this.#failed_effect);

				current_batch.on_fork_commit(() => {
					this.#handle_error(error);
				});
			} else {
				this.#handle_error(error);
			}
		}

		/**
		 * @param {unknown} error
		 */
		#handle_error(error) {
			if (this.#main_effect) {
				destroy_effect(this.#main_effect);
				this.#main_effect = null;
			}

			if (this.#pending_effect) {
				destroy_effect(this.#pending_effect);
				this.#pending_effect = null;
			}

			if (this.#failed_effect) {
				destroy_effect(this.#failed_effect);
				this.#failed_effect = null;
			}

			var onerror = this.#props.onerror;
			let failed = this.#props.failed;
			var did_reset = false;
			var calling_on_error = false;

			const reset = () => {
				if (did_reset) {
					svelte_boundary_reset_noop();
					return;
				}

				did_reset = true;

				if (calling_on_error) {
					svelte_boundary_reset_onerror();
				}

				if (this.#failed_effect !== null) {
					pause_effect(this.#failed_effect, () => {
						this.#failed_effect = null;
					});
				}

				this.#run(() => {
					this.#render();
				});
			};

			/** @param {unknown} transformed_error */
			const handle_error_result = (transformed_error) => {
				try {
					calling_on_error = true;
					onerror?.(transformed_error, reset);
					calling_on_error = false;
				} catch (error) {
					invoke_error_boundary(error, this.#effect && this.#effect.parent);
				}

				if (failed) {
					this.#failed_effect = this.#run(() => {
						try {
							return branch(() => {
								// errors in `failed` snippets cause the boundary to error again
								// TODO Svelte 6: revisit this decision, most likely better to go to parent boundary instead
								var effect = /** @type {Effect} */ (active_effect);

								effect.b = this;
								effect.f |= BOUNDARY_EFFECT;

								failed(
									this.#anchor,
									() => transformed_error,
									() => reset
								);
							});
						} catch (error) {
							invoke_error_boundary(error, /** @type {Effect} */ (this.#effect.parent));
							return null;
						}
					});
				}
			};

			queue_micro_task(() => {
				// Run the error through the API-level transformError transform (e.g. SvelteKit's handleError)
				/** @type {unknown} */
				var result;
				try {
					result = this.transform_error(error);
				} catch (e) {
					invoke_error_boundary(e, this.#effect && this.#effect.parent);
					return;
				}

				if (
					result !== null &&
					typeof result === 'object' &&
					typeof (/** @type {any} */ (result).then) === 'function'
				) {
					// transformError returned a Promise — wait for it
					/** @type {any} */ (result).then(
						handle_error_result,
						/** @param {unknown} e */
						(e) => invoke_error_boundary(e, this.#effect && this.#effect.parent)
					);
				} else {
					// Synchronous result — handle immediately
					handle_error_result(result);
				}
			});
		}
	}

	/** @import { Blocker, Effect, Value } from '#client' */

	/**
	 * @param {Blocker[]} blockers
	 * @param {Array<() => any>} sync
	 * @param {Array<() => Promise<any>>} async
	 * @param {(values: Value[]) => any} fn
	 */
	function flatten(blockers, sync, async, fn) {
		const d = is_runes() ? derived : derived_safe_equal;

		// Filter out already-settled blockers - no need to wait for them
		var pending = blockers.filter((b) => !b.settled);

		if (async.length === 0 && pending.length === 0) {
			fn(sync.map(d));
			return;
		}

		var parent = /** @type {Effect} */ (active_effect);

		var restore = capture();
		var blocker_promise =
			pending.length === 1
				? pending[0].promise
				: pending.length > 1
					? Promise.all(pending.map((b) => b.promise))
					: null;

		/** @param {Value[]} values */
		function finish(values) {
			restore();

			try {
				fn(values);
			} catch (error) {
				if ((parent.f & DESTROYED) === 0) {
					invoke_error_boundary(error, parent);
				}
			}

			unset_context();
		}

		// Fast path: blockers but no async expressions
		if (async.length === 0) {
			/** @type {Promise<any>} */ (blocker_promise).then(() => finish(sync.map(d)));
			return;
		}

		var decrement_pending = increment_pending();

		// Full path: has async expressions
		function run() {
			Promise.all(async.map((expression) => async_derived(expression)))
				.then((result) => finish([...sync.map(d), ...result]))
				.catch((error) => invoke_error_boundary(error, parent))
				.finally(() => decrement_pending());
		}

		if (blocker_promise) {
			blocker_promise.then(() => {
				restore();
				run();
				unset_context();
			});
		} else {
			run();
		}
	}

	/**
	 * Captures the current effect context so that we can restore it after
	 * some asynchronous work has happened (so that e.g. `await a + b`
	 * causes `b` to be registered as a dependency).
	 */
	function capture() {
		var previous_effect = /** @type {Effect} */ (active_effect);
		var previous_reaction = active_reaction;
		var previous_component_context = component_context;
		var previous_batch = /** @type {Batch} */ (current_batch);

		return function restore(activate_batch = true) {
			set_active_effect(previous_effect);
			set_active_reaction(previous_reaction);
			set_component_context(previous_component_context);

			if (activate_batch && (previous_effect.f & DESTROYED) === 0) {
				// TODO we only need optional chaining here because `{#await ...}` blocks
				// are anomalous. Once we retire them we can get rid of it
				previous_batch?.activate();
				previous_batch?.apply();
			}
		};
	}

	function unset_context(deactivate_batch = true) {
		set_active_effect(null);
		set_active_reaction(null);
		set_component_context(null);
		if (deactivate_batch) current_batch?.deactivate();
	}

	/**
	 * @returns {(skip?: boolean) => void}
	 */
	function increment_pending() {
		var effect = /** @type {Effect} */ (active_effect);
		var boundary = /** @type {Boundary} */ (effect.b);
		var batch = /** @type {Batch} */ (current_batch);
		var blocking = boundary.is_rendered();

		boundary.update_pending_count(1, batch);
		batch.increment(blocking, effect);

		return (skip = false) => {
			boundary.update_pending_count(-1, batch);
			batch.decrement(blocking, effect, skip);
		};
	}

	/** @import { Derived, Effect, Reaction, Source, Value } from '#client' */
	/** @import { Batch } from './batch.js'; */
	/** @import { Boundary } from '../dom/blocks/boundary.js'; */

	/**
	 * @template V
	 * @param {() => V} fn
	 * @returns {Derived<V>}
	 */
	/*#__NO_SIDE_EFFECTS__*/
	function derived(fn) {
		var flags = DERIVED | DIRTY;

		if (active_effect !== null) {
			// Since deriveds are evaluated lazily, any effects created inside them are
			// created too late to ensure that the parent effect is added to the tree
			active_effect.f |= EFFECT_PRESERVED;
		}

		/** @type {Derived<V>} */
		const signal = {
			ctx: component_context,
			deps: null,
			effects: null,
			equals: equals$1,
			f: flags,
			fn,
			reactions: null,
			rv: 0,
			v: /** @type {V} */ (UNINITIALIZED),
			wv: 0,
			parent: active_effect,
			ac: null
		};

		return signal;
	}

	/**
	 * @template V
	 * @param {() => V | Promise<V>} fn
	 * @param {string} [label]
	 * @param {string} [location] If provided, print a warning if the value is not read immediately after update
	 * @returns {Promise<Source<V>>}
	 */
	/*#__NO_SIDE_EFFECTS__*/
	function async_derived(fn, label, location) {
		let parent = /** @type {Effect | null} */ (active_effect);

		if (parent === null) {
			async_derived_orphan();
		}

		var promise = /** @type {Promise<V>} */ (/** @type {unknown} */ (undefined));
		var signal = source(/** @type {V} */ (UNINITIALIZED));

		// only suspend in async deriveds created on initialisation
		var should_suspend = !active_reaction;

		/** @type {Map<Batch, ReturnType<typeof deferred<V>>>} */
		var deferreds = new Map();

		async_effect(() => {
			var effect = /** @type {Effect} */ (active_effect);

			/** @type {ReturnType<typeof deferred<V>>} */
			var d = deferred();
			promise = d.promise;

			try {
				// If this code is changed at some point, make sure to still access the then property
				// of fn() to read any signals it might access, so that we track them as dependencies.
				// We call `unset_context` to undo any `save` calls that happen inside `fn()`
				Promise.resolve(fn()).then(d.resolve, d.reject).finally(unset_context);
			} catch (error) {
				d.reject(error);
				unset_context();
			}

			var batch = /** @type {Batch} */ (current_batch);

			if (should_suspend) {
				// we only increment the batch's pending state for updates, not creation, otherwise
				// we will decrement to zero before the work that depends on this promise (e.g. a
				// template effect) has initialized, causing the batch to resolve prematurely
				if ((effect.f & REACTION_RAN) !== 0) {
					var decrement_pending = increment_pending();
				}

				if (/** @type {Boundary} */ (parent.b).is_rendered()) {
					deferreds.get(batch)?.reject(STALE_REACTION);
					deferreds.delete(batch); // delete to ensure correct order in Map iteration below
				} else {
					// While the boundary is still showing pending, a new run supersedes all older in-flight runs
					// for this async expression. Cancel eagerly so resolution cannot commit stale values.
					for (const d of deferreds.values()) {
						d.reject(STALE_REACTION);
					}
					deferreds.clear();
				}

				deferreds.set(batch, d);
			}

			/**
			 * @param {any} value
			 * @param {unknown} error
			 */
			const handler = (value, error = undefined) => {

				if (decrement_pending) {
					// don't trigger an update if we're only here because
					// the promise was superseded before it could resolve
					var skip = error === STALE_REACTION;
					decrement_pending(skip);
				}

				if (error === STALE_REACTION || (effect.f & DESTROYED) !== 0) {
					return;
				}

				batch.activate();

				if (error) {
					signal.f |= ERROR_VALUE;

					// @ts-expect-error the error is the wrong type, but we don't care
					internal_set(signal, error);
				} else {
					if ((signal.f & ERROR_VALUE) !== 0) {
						signal.f ^= ERROR_VALUE;
					}

					internal_set(signal, value);

					// All prior async derived runs are now stale
					for (const [b, d] of deferreds) {
						deferreds.delete(b);
						if (b === batch) break;
						d.reject(STALE_REACTION);
					}
				}

				batch.deactivate();
			};

			d.promise.then(handler, (e) => handler(null, e || 'unknown'));
		});

		teardown(() => {
			for (const d of deferreds.values()) {
				d.reject(STALE_REACTION);
			}
		});

		return new Promise((fulfil) => {
			/** @param {Promise<V>} p */
			function next(p) {
				function go() {
					if (p === promise) {
						fulfil(signal);
					} else {
						// if the effect re-runs before the initial promise
						// resolves, delay resolution until we have a value
						next(promise);
					}
				}

				p.then(go, go);
			}

			next(promise);
		});
	}

	/**
	 * @template V
	 * @param {() => V} fn
	 * @returns {Derived<V>}
	 */
	/*#__NO_SIDE_EFFECTS__*/
	function user_derived(fn) {
		const d = derived(fn);

		push_reaction_value(d);

		return d;
	}

	/**
	 * @template V
	 * @param {() => V} fn
	 * @returns {Derived<V>}
	 */
	/*#__NO_SIDE_EFFECTS__*/
	function derived_safe_equal(fn) {
		const signal = derived(fn);
		signal.equals = safe_equals;
		return signal;
	}

	/**
	 * @param {Derived} derived
	 * @returns {void}
	 */
	function destroy_derived_effects(derived) {
		var effects = derived.effects;

		if (effects !== null) {
			derived.effects = null;

			for (var i = 0; i < effects.length; i += 1) {
				destroy_effect(/** @type {Effect} */ (effects[i]));
			}
		}
	}

	/**
	 * @template T
	 * @param {Derived} derived
	 * @returns {T}
	 */
	function execute_derived(derived) {
		var value;
		var prev_active_effect = active_effect;
		var parent = derived.parent;

		if (!is_destroying_effect && parent !== null && (parent.f & (DESTROYED | INERT)) !== 0) {
			derived_inert();

			return derived.v;
		}

		set_active_effect(parent);

		{
			try {
				derived.f &= ~WAS_MARKED;
				destroy_derived_effects(derived);
				value = update_reaction(derived);
			} finally {
				set_active_effect(prev_active_effect);
			}
		}

		return value;
	}

	/**
	 * @param {Derived} derived
	 * @returns {void}
	 */
	function update_derived(derived) {
		var value = execute_derived(derived);

		if (!derived.equals(value)) {
			derived.wv = increment_write_version();

			// in a fork, we don't update the underlying value, just `batch_values`.
			// the underlying value will be updated when the fork is committed.
			// otherwise, the next time we get here after a 'real world' state
			// change, `derived.equals` may incorrectly return `true`
			if (!current_batch?.is_fork || derived.deps === null) {
				if (current_batch !== null) {
					current_batch.capture(derived, value, true);
				} else {
					derived.v = value;
				}

				// deriveds without dependencies should never be recomputed
				if (derived.deps === null) {
					set_signal_status(derived, CLEAN);
					return;
				}
			}
		}

		// don't mark derived clean if we're reading it inside a
		// cleanup function, or it will cache a stale value
		if (is_destroying_effect) {
			return;
		}

		// During time traveling we don't want to reset the status so that
		// traversal of the graph in the other batches still happens
		if (batch_values !== null) {
			// only cache the value if we're in a tracking context, otherwise we won't
			// clear the cache in `mark_reactions` when dependencies are updated
			if (effect_tracking() || current_batch?.is_fork) {
				batch_values.set(derived, value);
			}
		} else {
			update_derived_status(derived);
		}
	}

	/**
	 * @param {Derived} derived
	 */
	function freeze_derived_effects(derived) {
		if (derived.effects === null) return;

		for (const e of derived.effects) {
			// if the effect has a teardown function or abort signal, call it
			if (e.teardown || e.ac) {
				e.teardown?.();
				e.ac?.abort(STALE_REACTION);

				// make it a noop so it doesn't get called again if the derived
				// is unfrozen. we don't set it to `null`, because the existence
				// of a teardown function is what determines whether the
				// effect runs again during unfreezing
				e.teardown = noop;
				e.ac = null;

				remove_reactions(e, 0);
				destroy_effect_children(e);
			}
		}
	}

	/**
	 * @param {Derived} derived
	 */
	function unfreeze_derived_effects(derived) {
		if (derived.effects === null) return;

		for (const e of derived.effects) {
			// if the effect was previously frozen — indicated by the presence
			// of a teardown function — unfreeze it
			if (e.teardown) {
				update_effect(e);
			}
		}
	}

	/** @import { Derived, Effect, Source, Value } from '#client' */

	/** @type {Set<any>} */
	let eager_effects = new Set();

	/** @type {Map<Source, any>} */
	const old_values = new Map();

	let eager_effects_deferred = false;

	/**
	 * @template V
	 * @param {V} v
	 * @param {Error | null} [stack]
	 * @returns {Source<V>}
	 */
	// TODO rename this to `state` throughout the codebase
	function source(v, stack) {
		/** @type {Value} */
		var signal = {
			f: 0, // TODO ideally we could skip this altogether, but it causes type errors
			v,
			reactions: null,
			equals: equals$1,
			rv: 0,
			wv: 0
		};

		return signal;
	}

	/**
	 * @template V
	 * @param {V} v
	 * @param {Error | null} [stack]
	 */
	/*#__NO_SIDE_EFFECTS__*/
	function state(v, stack) {
		const s = source(v);

		push_reaction_value(s);

		return s;
	}

	/**
	 * @template V
	 * @param {V} initial_value
	 * @param {boolean} [immutable]
	 * @returns {Source<V>}
	 */
	/*#__NO_SIDE_EFFECTS__*/
	function mutable_source(initial_value, immutable = false, trackable = true) {
		const s = source(initial_value);
		if (!immutable) {
			s.equals = safe_equals;
		}

		// bind the signal to the component context, in case we need to
		// track updates to trigger beforeUpdate/afterUpdate callbacks
		if (legacy_mode_flag && trackable && component_context !== null && component_context.l !== null) {
			(component_context.l.s ??= []).push(s);
		}

		return s;
	}

	/**
	 * @template V
	 * @param {Source<V>} source
	 * @param {V} value
	 * @param {boolean} [should_proxy]
	 * @returns {V}
	 */
	function set(source, value, should_proxy = false) {
		if (
			active_reaction !== null &&
			// since we are untracking the function inside `$inspect.with` we need to add this check
			// to ensure we error if state is set inside an inspect effect
			(!untracking || (active_reaction.f & EAGER_EFFECT) !== 0) &&
			is_runes() &&
			(active_reaction.f & (DERIVED | BLOCK_EFFECT | ASYNC | EAGER_EFFECT)) !== 0 &&
			(current_sources === null || !includes.call(current_sources, source))
		) {
			state_unsafe_mutation();
		}

		let new_value = should_proxy ? proxy(value) : value;

		return internal_set(source, new_value, legacy_updates);
	}

	/**
	 * @template V
	 * @param {Source<V>} source
	 * @param {V} value
	 * @param {Effect[] | null} [updated_during_traversal]
	 * @returns {V}
	 */
	function internal_set(source, value, updated_during_traversal = null) {
		if (!source.equals(value)) {
			old_values.set(source, is_destroying_effect ? value : source.v);

			var batch = Batch.ensure();
			batch.capture(source, value);

			if ((source.f & DERIVED) !== 0) {
				const derived = /** @type {Derived} */ (source);

				// if we are assigning to a dirty derived we set it to clean/maybe dirty but we also eagerly execute it to track the dependencies
				if ((source.f & DIRTY) !== 0) {
					execute_derived(derived);
				}

				// During time traveling we don't want to reset the status so that
				// traversal of the graph in the other batches still happens
				if (batch_values === null) {
					update_derived_status(derived);
				}
			}

			source.wv = increment_write_version();

			// For debugging, in case you want to know which reactions are being scheduled:
			// log_reactions(source);
			mark_reactions(source, DIRTY, updated_during_traversal);

			// It's possible that the current reaction might not have up-to-date dependencies
			// whilst it's actively running. So in the case of ensuring it registers the reaction
			// properly for itself, we need to ensure the current effect actually gets
			// scheduled. i.e: `$effect(() => x++)`
			if (
				is_runes() &&
				active_effect !== null &&
				(active_effect.f & CLEAN) !== 0 &&
				(active_effect.f & (BRANCH_EFFECT | ROOT_EFFECT)) === 0
			) {
				if (untracked_writes === null) {
					set_untracked_writes([source]);
				} else {
					untracked_writes.push(source);
				}
			}

			if (!batch.is_fork && eager_effects.size > 0 && !eager_effects_deferred) {
				flush_eager_effects();
			}
		}

		return value;
	}

	function flush_eager_effects() {
		eager_effects_deferred = false;

		for (const effect of eager_effects) {
			// Mark clean inspect-effects as maybe dirty and then check their dirtiness
			// instead of just updating the effects - this way we avoid overfiring.
			if ((effect.f & CLEAN) !== 0) {
				set_signal_status(effect, MAYBE_DIRTY);
			}

			if (is_dirty(effect)) {
				update_effect(effect);
			}
		}

		eager_effects.clear();
	}

	/**
	 * Silently (without using `get`) increment a source
	 * @param {Source<number>} source
	 */
	function increment(source) {
		set(source, source.v + 1);
	}

	/**
	 * @param {Value} signal
	 * @param {number} status should be DIRTY or MAYBE_DIRTY
	 * @param {Effect[] | null} updated_during_traversal
	 * @returns {void}
	 */
	function mark_reactions(signal, status, updated_during_traversal) {
		var reactions = signal.reactions;
		if (reactions === null) return;

		var runes = is_runes();
		var length = reactions.length;

		for (var i = 0; i < length; i++) {
			var reaction = reactions[i];
			var flags = reaction.f;

			// In legacy mode, skip the current effect to prevent infinite loops
			if (!runes && reaction === active_effect) continue;

			var not_dirty = (flags & DIRTY) === 0;

			// don't set a DIRTY reaction to MAYBE_DIRTY
			if (not_dirty) {
				set_signal_status(reaction, status);
			}

			if ((flags & DERIVED) !== 0) {
				var derived = /** @type {Derived} */ (reaction);

				batch_values?.delete(derived);

				if ((flags & WAS_MARKED) === 0) {
					// Only connected deriveds can be reliably unmarked right away
					if (flags & CONNECTED) {
						reaction.f |= WAS_MARKED;
					}

					mark_reactions(derived, MAYBE_DIRTY, updated_during_traversal);
				}
			} else if (not_dirty) {
				var effect = /** @type {Effect} */ (reaction);

				if ((flags & BLOCK_EFFECT) !== 0 && eager_block_effects !== null) {
					eager_block_effects.add(effect);
				}

				if (updated_during_traversal !== null) {
					updated_during_traversal.push(effect);
				} else {
					schedule_effect(effect);
				}
			}
		}
	}

	/** @import { Source } from '#client' */

	/**
	 * @template T
	 * @param {T} value
	 * @returns {T}
	 */
	function proxy(value) {
		// if non-proxyable, or is already a proxy, return `value`
		if (typeof value !== 'object' || value === null || STATE_SYMBOL in value) {
			return value;
		}

		const prototype = get_prototype_of(value);

		if (prototype !== object_prototype && prototype !== array_prototype) {
			return value;
		}

		/** @type {Map<any, Source<any>>} */
		var sources = new Map();
		var is_proxied_array = is_array(value);
		var version = state(0);
		var parent_version = update_version;

		/**
		 * Executes the proxy in the context of the reaction it was originally created in, if any
		 * @template T
		 * @param {() => T} fn
		 */
		var with_parent = (fn) => {
			if (update_version === parent_version) {
				return fn();
			}

			// child source is being created after the initial proxy —
			// prevent it from being associated with the current reaction
			var reaction = active_reaction;
			var version = update_version;

			set_active_reaction(null);
			set_update_version(parent_version);

			var result = fn();

			set_active_reaction(reaction);
			set_update_version(version);

			return result;
		};

		if (is_proxied_array) {
			// We need to create the length source eagerly to ensure that
			// mutations to the array are properly synced with our proxy
			sources.set('length', state(/** @type {any[]} */ (value).length));
		}

		return new Proxy(/** @type {any} */ (value), {
			defineProperty(_, prop, descriptor) {
				if (
					!('value' in descriptor) ||
					descriptor.configurable === false ||
					descriptor.enumerable === false ||
					descriptor.writable === false
				) {
					// we disallow non-basic descriptors, because unless they are applied to the
					// target object — which we avoid, so that state can be forked — we will run
					// afoul of the various invariants
					// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/getOwnPropertyDescriptor#invariants
					state_descriptors_fixed();
				}
				var s = sources.get(prop);
				if (s === undefined) {
					with_parent(() => {
						var s = state(descriptor.value);
						sources.set(prop, s);
						return s;
					});
				} else {
					set(s, descriptor.value, true);
				}

				return true;
			},

			deleteProperty(target, prop) {
				var s = sources.get(prop);

				if (s === undefined) {
					if (prop in target) {
						const s = with_parent(() => state(UNINITIALIZED));
						sources.set(prop, s);
						increment(version);
					}
				} else {
					set(s, UNINITIALIZED);
					increment(version);
				}

				return true;
			},

			get(target, prop, receiver) {
				if (prop === STATE_SYMBOL) {
					return value;
				}

				var s = sources.get(prop);
				var exists = prop in target;

				// create a source, but only if it's an own property and not a prototype property
				if (s === undefined && (!exists || get_descriptor(target, prop)?.writable)) {
					s = with_parent(() => {
						var p = proxy(exists ? target[prop] : UNINITIALIZED);
						var s = state(p);

						return s;
					});

					sources.set(prop, s);
				}

				if (s !== undefined) {
					var v = get(s);
					return v === UNINITIALIZED ? undefined : v;
				}

				return Reflect.get(target, prop, receiver);
			},

			getOwnPropertyDescriptor(target, prop) {
				var descriptor = Reflect.getOwnPropertyDescriptor(target, prop);

				if (descriptor && 'value' in descriptor) {
					var s = sources.get(prop);
					if (s) descriptor.value = get(s);
				} else if (descriptor === undefined) {
					var source = sources.get(prop);
					var value = source?.v;

					if (source !== undefined && value !== UNINITIALIZED) {
						return {
							enumerable: true,
							configurable: true,
							value,
							writable: true
						};
					}
				}

				return descriptor;
			},

			has(target, prop) {
				if (prop === STATE_SYMBOL) {
					return true;
				}

				var s = sources.get(prop);
				var has = (s !== undefined && s.v !== UNINITIALIZED) || Reflect.has(target, prop);

				if (
					s !== undefined ||
					(active_effect !== null && (!has || get_descriptor(target, prop)?.writable))
				) {
					if (s === undefined) {
						s = with_parent(() => {
							var p = has ? proxy(target[prop]) : UNINITIALIZED;
							var s = state(p);

							return s;
						});

						sources.set(prop, s);
					}

					var value = get(s);
					if (value === UNINITIALIZED) {
						return false;
					}
				}

				return has;
			},

			set(target, prop, value, receiver) {
				var s = sources.get(prop);
				var has = prop in target;

				// variable.length = value -> clear all signals with index >= value
				if (is_proxied_array && prop === 'length') {
					for (var i = value; i < /** @type {Source<number>} */ (s).v; i += 1) {
						var other_s = sources.get(i + '');
						if (other_s !== undefined) {
							set(other_s, UNINITIALIZED);
						} else if (i in target) {
							// If the item exists in the original, we need to create an uninitialized source,
							// else a later read of the property would result in a source being created with
							// the value of the original item at that index.
							other_s = with_parent(() => state(UNINITIALIZED));
							sources.set(i + '', other_s);
						}
					}
				}

				// If we haven't yet created a source for this property, we need to ensure
				// we do so otherwise if we read it later, then the write won't be tracked and
				// the heuristics of effects will be different vs if we had read the proxied
				// object property before writing to that property.
				if (s === undefined) {
					if (!has || get_descriptor(target, prop)?.writable) {
						s = with_parent(() => state(undefined));
						set(s, proxy(value));

						sources.set(prop, s);
					}
				} else {
					has = s.v !== UNINITIALIZED;

					var p = with_parent(() => proxy(value));
					set(s, p);
				}

				var descriptor = Reflect.getOwnPropertyDescriptor(target, prop);

				// Set the new value before updating any signals so that any listeners get the new value
				if (descriptor?.set) {
					descriptor.set.call(receiver, value);
				}

				if (!has) {
					// If we have mutated an array directly, we might need to
					// signal that length has also changed. Do it before updating metadata
					// to ensure that iterating over the array as a result of a metadata update
					// will not cause the length to be out of sync.
					if (is_proxied_array && typeof prop === 'string') {
						var ls = /** @type {Source<number>} */ (sources.get('length'));
						var n = Number(prop);

						if (Number.isInteger(n) && n >= ls.v) {
							set(ls, n + 1);
						}
					}

					increment(version);
				}

				return true;
			},

			ownKeys(target) {
				get(version);

				var own_keys = Reflect.ownKeys(target).filter((key) => {
					var source = sources.get(key);
					return source === undefined || source.v !== UNINITIALIZED;
				});

				for (var [key, source] of sources) {
					if (source.v !== UNINITIALIZED && !(key in target)) {
						own_keys.push(key);
					}
				}

				return own_keys;
			},

			setPrototypeOf() {
				state_prototype_fixed();
			}
		});
	}

	/**
	 * @param {any} value
	 */
	function get_proxied_value(value) {
		try {
			if (value !== null && typeof value === 'object' && STATE_SYMBOL in value) {
				return value[STATE_SYMBOL];
			}
		} catch {
			// the above if check can throw an error if the value in question
			// is the contentWindow of an iframe on another domain, in which
			// case we want to just return the value (because it's definitely
			// not a proxied value) so we don't break any JavaScript interacting
			// with that iframe (such as various payment companies client side
			// JavaScript libraries interacting with their iframes on the same
			// domain)
		}

		return value;
	}

	/**
	 * @param {any} a
	 * @param {any} b
	 * @param {boolean} equal
	 * @returns {boolean}
	 */
	function strict_equals(a, b, equal = true) {
		// try-catch needed because this tries to read properties of `a` and `b`,
		// which could be disallowed for example in a secure context
		try {
			if ((a === b) !== (get_proxied_value(a) === get_proxied_value(b))) {
				state_proxy_equality_mismatch(equal ? '===' : '!==');
			}
		} catch {}

		return (a === b) === equal;
	}

	/**
	 * @param {any} a
	 * @param {any} b
	 * @param {boolean} equal
	 * @returns {boolean}
	 */
	function equals(a, b, equal = true) {
		if ((a == b) !== (get_proxied_value(a) == get_proxied_value(b))) {
			state_proxy_equality_mismatch();
		}

		return (a == b) === equal;
	}

	/** @import { Effect, TemplateNode } from '#client' */

	// export these for reference in the compiled code, making global name deduplication unnecessary
	/** @type {Window} */
	var $window;

	/** @type {boolean} */
	var is_firefox;

	/** @type {() => Node | null} */
	var first_child_getter;
	/** @type {() => Node | null} */
	var next_sibling_getter;

	/**
	 * Initialize these lazily to avoid issues when using the runtime in a server context
	 * where these globals are not available while avoiding a separate server entry point
	 */
	function init_operations() {
		if ($window !== undefined) {
			return;
		}

		$window = window;
		is_firefox = /Firefox/.test(navigator.userAgent);

		var element_prototype = Element.prototype;
		var node_prototype = Node.prototype;
		var text_prototype = Text.prototype;

		// @ts-ignore
		first_child_getter = get_descriptor(node_prototype, 'firstChild').get;
		// @ts-ignore
		next_sibling_getter = get_descriptor(node_prototype, 'nextSibling').get;

		if (is_extensible(element_prototype)) {
			// the following assignments improve perf of lookups on DOM nodes
			// @ts-expect-error
			element_prototype.__click = undefined;
			// @ts-expect-error
			element_prototype.__className = undefined;
			// @ts-expect-error
			element_prototype.__attributes = null;
			// @ts-expect-error
			element_prototype.__style = undefined;
			// @ts-expect-error
			element_prototype.__e = undefined;
		}

		if (is_extensible(text_prototype)) {
			// @ts-expect-error
			text_prototype.__t = undefined;
		}
	}

	/**
	 * @param {string} value
	 * @returns {Text}
	 */
	function create_text(value = '') {
		return document.createTextNode(value);
	}

	/**
	 * @template {Node} N
	 * @param {N} node
	 */
	/*@__NO_SIDE_EFFECTS__*/
	function get_first_child(node) {
		return /** @type {TemplateNode | null} */ (first_child_getter.call(node));
	}

	/**
	 * @template {Node} N
	 * @param {N} node
	 */
	/*@__NO_SIDE_EFFECTS__*/
	function get_next_sibling(node) {
		return /** @type {TemplateNode | null} */ (next_sibling_getter.call(node));
	}

	/**
	 * Don't mark this as side-effect-free, hydration needs to walk all nodes
	 * @template {Node} N
	 * @param {N} node
	 * @param {boolean} is_text
	 * @returns {TemplateNode | null}
	 */
	function child(node, is_text) {
		{
			return get_first_child(node);
		}
	}

	/**
	 * Don't mark this as side-effect-free, hydration needs to walk all nodes
	 * @param {TemplateNode} node
	 * @param {boolean} [is_text]
	 * @returns {TemplateNode | null}
	 */
	function first_child(node, is_text = false) {
		{
			var first = get_first_child(node);

			// TODO prevent user comments with the empty string when preserveComments is true
			if (first instanceof Comment && first.data === '') return get_next_sibling(first);

			return first;
		}
	}

	/**
	 * Don't mark this as side-effect-free, hydration needs to walk all nodes
	 * @param {TemplateNode} node
	 * @param {number} count
	 * @param {boolean} is_text
	 * @returns {TemplateNode | null}
	 */
	function sibling(node, count = 1, is_text = false) {
		let next_sibling = node;

		while (count--) {
			next_sibling = /** @type {TemplateNode} */ (get_next_sibling(next_sibling));
		}

		{
			return next_sibling;
		}
	}

	/**
	 * @template {Node} N
	 * @param {N} node
	 * @returns {void}
	 */
	function clear_text_content(node) {
		node.textContent = '';
	}

	/**
	 * Returns `true` if we're updating the current block, for example `condition` in
	 * an `{#if condition}` block just changed. In this case, the branch should be
	 * appended (or removed) at the same time as other updates within the
	 * current `<svelte:boundary>`
	 */
	function should_defer_append() {
		return false;
	}

	/**
	 * @template {keyof HTMLElementTagNameMap | string} T
	 * @param {T} tag
	 * @param {string} [namespace]
	 * @param {string} [is]
	 * @returns {T extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[T] : Element}
	 */
	function create_element(tag, namespace, is) {
		let options = undefined;
		return /** @type {T extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[T] : Element} */ (
			document.createElementNS(namespace ?? NAMESPACE_HTML, tag, options)
		);
	}

	let listening_to_form_reset = false;

	function add_form_reset_listener() {
		if (!listening_to_form_reset) {
			listening_to_form_reset = true;
			document.addEventListener(
				'reset',
				(evt) => {
					// Needs to happen one tick later or else the dom properties of the form
					// elements have not updated to their reset values yet
					Promise.resolve().then(() => {
						if (!evt.defaultPrevented) {
							for (const e of /**@type {HTMLFormElement} */ (evt.target).elements) {
								// @ts-expect-error
								e.__on_r?.();
							}
						}
					});
				},
				// In the capture phase to guarantee we get noticed of it (no possibility of stopPropagation)
				{ capture: true }
			);
		}
	}

	/**
	 * @template T
	 * @param {() => T} fn
	 */
	function without_reactive_context(fn) {
		var previous_reaction = active_reaction;
		var previous_effect = active_effect;
		set_active_reaction(null);
		set_active_effect(null);
		try {
			return fn();
		} finally {
			set_active_reaction(previous_reaction);
			set_active_effect(previous_effect);
		}
	}

	/**
	 * Listen to the given event, and then instantiate a global form reset listener if not already done,
	 * to notify all bindings when the form is reset
	 * @param {HTMLElement} element
	 * @param {string} event
	 * @param {(is_reset?: true) => void} handler
	 * @param {(is_reset?: true) => void} [on_reset]
	 */
	function listen_to_event_and_reset_event(element, event, handler, on_reset = handler) {
		element.addEventListener(event, () => without_reactive_context(handler));
		// @ts-expect-error
		const prev = element.__on_r;
		if (prev) {
			// special case for checkbox that can have multiple binds (group & checked)
			// @ts-expect-error
			element.__on_r = () => {
				prev();
				on_reset(true);
			};
		} else {
			// @ts-expect-error
			element.__on_r = () => on_reset(true);
		}

		add_form_reset_listener();
	}

	/** @import { Blocker, ComponentContext, ComponentContextLegacy, Derived, Effect, TemplateNode, TransitionManager } from '#client' */

	/**
	 * @param {'$effect' | '$effect.pre' | '$inspect'} rune
	 */
	function validate_effect(rune) {
		if (active_effect === null) {
			if (active_reaction === null) {
				effect_orphan();
			}

			effect_in_unowned_derived();
		}

		if (is_destroying_effect) {
			effect_in_teardown();
		}
	}

	/**
	 * @param {Effect} effect
	 * @param {Effect} parent_effect
	 */
	function push_effect(effect, parent_effect) {
		var parent_last = parent_effect.last;
		if (parent_last === null) {
			parent_effect.last = parent_effect.first = effect;
		} else {
			parent_last.next = effect;
			effect.prev = parent_last;
			parent_effect.last = effect;
		}
	}

	/**
	 * @param {number} type
	 * @param {null | (() => void | (() => void))} fn
	 * @returns {Effect}
	 */
	function create_effect(type, fn) {
		var parent = active_effect;

		if (parent !== null && (parent.f & INERT) !== 0) {
			type |= INERT;
		}

		/** @type {Effect} */
		var effect = {
			ctx: component_context,
			deps: null,
			nodes: null,
			f: type | DIRTY | CONNECTED,
			first: null,
			fn,
			last: null,
			next: null,
			parent,
			b: parent && parent.b,
			prev: null,
			teardown: null,
			wv: 0,
			ac: null
		};

		current_batch?.register_created_effect(effect);

		/** @type {Effect | null} */
		var e = effect;

		if ((type & EFFECT) !== 0) {
			if (collected_effects !== null) {
				// created during traversal — collect and run afterwards
				collected_effects.push(effect);
			} else {
				// schedule for later
				Batch.ensure().schedule(effect);
			}
		} else if (fn !== null) {
			try {
				update_effect(effect);
			} catch (e) {
				destroy_effect(effect);
				throw e;
			}

			// if an effect doesn't need to be kept in the tree (because it
			// won't re-run, has no DOM, and has no teardown etc)
			// then we skip it and go to its child (if any)
			if (
				e.deps === null &&
				e.teardown === null &&
				e.nodes === null &&
				e.first === e.last && // either `null`, or a singular child
				(e.f & EFFECT_PRESERVED) === 0
			) {
				e = e.first;
				if ((type & BLOCK_EFFECT) !== 0 && (type & EFFECT_TRANSPARENT) !== 0 && e !== null) {
					e.f |= EFFECT_TRANSPARENT;
				}
			}
		}

		if (e !== null) {
			e.parent = parent;

			if (parent !== null) {
				push_effect(e, parent);
			}

			// if we're in a derived, add the effect there too
			if (
				active_reaction !== null &&
				(active_reaction.f & DERIVED) !== 0 &&
				(type & ROOT_EFFECT) === 0
			) {
				var derived = /** @type {Derived} */ (active_reaction);
				(derived.effects ??= []).push(e);
			}
		}

		return effect;
	}

	/**
	 * Internal representation of `$effect.tracking()`
	 * @returns {boolean}
	 */
	function effect_tracking() {
		return active_reaction !== null && !untracking;
	}

	/**
	 * @param {() => void} fn
	 */
	function teardown(fn) {
		const effect = create_effect(RENDER_EFFECT, null);
		set_signal_status(effect, CLEAN);
		effect.teardown = fn;
		return effect;
	}

	/**
	 * Internal representation of `$effect(...)`
	 * @param {() => void | (() => void)} fn
	 */
	function user_effect(fn) {
		validate_effect();

		// Non-nested `$effect(...)` in a component should be deferred
		// until the component is mounted
		var flags = /** @type {Effect} */ (active_effect).f;
		var defer = !active_reaction && (flags & BRANCH_EFFECT) !== 0 && (flags & REACTION_RAN) === 0;

		if (defer) {
			// Top-level `$effect(...)` in an unmounted component — defer until mount
			var context = /** @type {ComponentContext} */ (component_context);
			(context.e ??= []).push(fn);
		} else {
			// Everything else — create immediately
			return create_user_effect(fn);
		}
	}

	/**
	 * @param {() => void | (() => void)} fn
	 */
	function create_user_effect(fn) {
		return create_effect(EFFECT | USER_EFFECT, fn);
	}

	/**
	 * Internal representation of `$effect.pre(...)`
	 * @param {() => void | (() => void)} fn
	 * @returns {Effect}
	 */
	function user_pre_effect(fn) {
		validate_effect();
		return create_effect(RENDER_EFFECT | USER_EFFECT, fn);
	}

	/**
	 * An effect root whose children can transition out
	 * @param {() => void} fn
	 * @returns {(options?: { outro?: boolean }) => Promise<void>}
	 */
	function component_root(fn) {
		Batch.ensure();
		const effect = create_effect(ROOT_EFFECT | EFFECT_PRESERVED, fn);

		return (options = {}) => {
			return new Promise((fulfil) => {
				if (options.outro) {
					pause_effect(effect, () => {
						destroy_effect(effect);
						fulfil(undefined);
					});
				} else {
					destroy_effect(effect);
					fulfil(undefined);
				}
			});
		};
	}

	/**
	 * @param {() => void | (() => void)} fn
	 * @returns {Effect}
	 */
	function effect(fn) {
		return create_effect(EFFECT, fn);
	}

	/**
	 * Internal representation of `$: ..`
	 * @param {() => any} deps
	 * @param {() => void | (() => void)} fn
	 */
	function legacy_pre_effect(deps, fn) {
		var context = /** @type {ComponentContextLegacy} */ (component_context);

		/** @type {{ effect: null | Effect, ran: boolean, deps: () => any }} */
		var token = { effect: null, ran: false, deps };

		context.l.$.push(token);

		token.effect = render_effect(() => {
			deps();

			// If this legacy pre effect has already run before the end of the reset, then
			// bail out to emulate the same behavior.
			if (token.ran) return;

			token.ran = true;

			var effect = /** @type {Effect} */ (active_effect);

			// here, we lie: by setting `active_effect` to be the parent branch, any writes
			// that happen inside `fn` will _not_ cause an unnecessary reschedule, because
			// the affected effects will be children of `active_effect`. this is safe
			// because these effects are known to run in the correct order
			try {
				set_active_effect(effect.parent);
				untrack(fn);
			} finally {
				set_active_effect(effect);
			}
		});
	}

	function legacy_pre_effect_reset() {
		var context = /** @type {ComponentContextLegacy} */ (component_context);

		render_effect(() => {
			// Run dirty `$:` statements
			for (var token of context.l.$) {
				token.deps();

				var effect = token.effect;

				// If the effect is CLEAN, then make it MAYBE_DIRTY. This ensures we traverse through
				// the effects dependencies and correctly ensure each dependency is up-to-date.
				if ((effect.f & CLEAN) !== 0 && effect.deps !== null) {
					set_signal_status(effect, MAYBE_DIRTY);
				}

				if (is_dirty(effect)) {
					update_effect(effect);
				}

				token.ran = false;
			}
		});
	}

	/**
	 * @param {() => void | (() => void)} fn
	 * @returns {Effect}
	 */
	function async_effect(fn) {
		return create_effect(ASYNC | EFFECT_PRESERVED, fn);
	}

	/**
	 * @param {() => void | (() => void)} fn
	 * @returns {Effect}
	 */
	function render_effect(fn, flags = 0) {
		return create_effect(RENDER_EFFECT | flags, fn);
	}

	/**
	 * @param {(...expressions: any) => void | (() => void)} fn
	 * @param {Array<() => any>} sync
	 * @param {Array<() => Promise<any>>} async
	 * @param {Blocker[]} blockers
	 */
	function template_effect(fn, sync = [], async = [], blockers = []) {
		flatten(blockers, sync, async, (values) => {
			create_effect(RENDER_EFFECT, () => fn(...values.map(get)));
		});
	}

	/**
	 * @param {(() => void)} fn
	 * @param {number} flags
	 */
	function block(fn, flags = 0) {
		var effect = create_effect(BLOCK_EFFECT | flags, fn);
		return effect;
	}

	/**
	 * @param {(() => void)} fn
	 */
	function branch(fn) {
		return create_effect(BRANCH_EFFECT | EFFECT_PRESERVED, fn);
	}

	/**
	 * @param {Effect} effect
	 */
	function execute_effect_teardown(effect) {
		var teardown = effect.teardown;
		if (teardown !== null) {
			const previously_destroying_effect = is_destroying_effect;
			const previous_reaction = active_reaction;
			set_is_destroying_effect(true);
			set_active_reaction(null);
			try {
				teardown.call(null);
			} finally {
				set_is_destroying_effect(previously_destroying_effect);
				set_active_reaction(previous_reaction);
			}
		}
	}

	/**
	 * @param {Effect} signal
	 * @param {boolean} remove_dom
	 * @returns {void}
	 */
	function destroy_effect_children(signal, remove_dom = false) {
		var effect = signal.first;
		signal.first = signal.last = null;

		while (effect !== null) {
			const controller = effect.ac;

			if (controller !== null) {
				without_reactive_context(() => {
					controller.abort(STALE_REACTION);
				});
			}

			var next = effect.next;

			if ((effect.f & ROOT_EFFECT) !== 0) {
				// this is now an independent root
				effect.parent = null;
			} else {
				destroy_effect(effect, remove_dom);
			}

			effect = next;
		}
	}

	/**
	 * @param {Effect} signal
	 * @returns {void}
	 */
	function destroy_block_effect_children(signal) {
		var effect = signal.first;

		while (effect !== null) {
			var next = effect.next;
			if ((effect.f & BRANCH_EFFECT) === 0) {
				destroy_effect(effect);
			}
			effect = next;
		}
	}

	/**
	 * @param {Effect} effect
	 * @param {boolean} [remove_dom]
	 * @returns {void}
	 */
	function destroy_effect(effect, remove_dom = true) {
		var removed = false;

		if (
			(remove_dom || (effect.f & HEAD_EFFECT) !== 0) &&
			effect.nodes !== null &&
			effect.nodes.end !== null
		) {
			remove_effect_dom(effect.nodes.start, /** @type {TemplateNode} */ (effect.nodes.end));
			removed = true;
		}

		set_signal_status(effect, DESTROYING);
		destroy_effect_children(effect, remove_dom && !removed);
		remove_reactions(effect, 0);

		var transitions = effect.nodes && effect.nodes.t;

		if (transitions !== null) {
			for (const transition of transitions) {
				transition.stop();
			}
		}

		execute_effect_teardown(effect);

		effect.f ^= DESTROYING;
		effect.f |= DESTROYED;

		var parent = effect.parent;

		// If the parent doesn't have any children, then skip this work altogether
		if (parent !== null && parent.first !== null) {
			unlink_effect(effect);
		}

		// `first` and `child` are nulled out in destroy_effect_children
		// we don't null out `parent` so that error propagation can work correctly
		effect.next =
			effect.prev =
			effect.teardown =
			effect.ctx =
			effect.deps =
			effect.fn =
			effect.nodes =
			effect.ac =
			effect.b =
				null;
	}

	/**
	 *
	 * @param {TemplateNode | null} node
	 * @param {TemplateNode} end
	 */
	function remove_effect_dom(node, end) {
		while (node !== null) {
			/** @type {TemplateNode | null} */
			var next = node === end ? null : get_next_sibling(node);

			node.remove();
			node = next;
		}
	}

	/**
	 * Detach an effect from the effect tree, freeing up memory and
	 * reducing the amount of work that happens on subsequent traversals
	 * @param {Effect} effect
	 */
	function unlink_effect(effect) {
		var parent = effect.parent;
		var prev = effect.prev;
		var next = effect.next;

		if (prev !== null) prev.next = next;
		if (next !== null) next.prev = prev;

		if (parent !== null) {
			if (parent.first === effect) parent.first = next;
			if (parent.last === effect) parent.last = prev;
		}
	}

	/**
	 * When a block effect is removed, we don't immediately destroy it or yank it
	 * out of the DOM, because it might have transitions. Instead, we 'pause' it.
	 * It stays around (in memory, and in the DOM) until outro transitions have
	 * completed, and if the state change is reversed then we _resume_ it.
	 * A paused effect does not update, and the DOM subtree becomes inert.
	 * @param {Effect} effect
	 * @param {() => void} [callback]
	 * @param {boolean} [destroy]
	 */
	function pause_effect(effect, callback, destroy = true) {
		/** @type {TransitionManager[]} */
		var transitions = [];

		pause_children(effect, transitions, true);

		var fn = () => {
			if (destroy) destroy_effect(effect);
			if (callback) callback();
		};

		var remaining = transitions.length;
		if (remaining > 0) {
			var check = () => --remaining || fn();
			for (var transition of transitions) {
				transition.out(check);
			}
		} else {
			fn();
		}
	}

	/**
	 * @param {Effect} effect
	 * @param {TransitionManager[]} transitions
	 * @param {boolean} local
	 */
	function pause_children(effect, transitions, local) {
		if ((effect.f & INERT) !== 0) return;
		effect.f ^= INERT;

		var t = effect.nodes && effect.nodes.t;

		if (t !== null) {
			for (const transition of t) {
				if (transition.is_global || local) {
					transitions.push(transition);
				}
			}
		}

		var child = effect.first;

		while (child !== null) {
			var sibling = child.next;

			// If this child is a root effect, then it will become an independent root when its parent
			// is destroyed, it should therefore not become inert nor partake in transitions.
			if ((child.f & ROOT_EFFECT) === 0) {
				var transparent =
					(child.f & EFFECT_TRANSPARENT) !== 0 ||
					// If this is a branch effect without a block effect parent,
					// it means the parent block effect was pruned. In that case,
					// transparency information was transferred to the branch effect.
					((child.f & BRANCH_EFFECT) !== 0 && (effect.f & BLOCK_EFFECT) !== 0);
				// TODO we don't need to call pause_children recursively with a linked list in place
				// it's slightly more involved though as we have to account for `transparent` changing
				// through the tree.
				pause_children(child, transitions, transparent ? local : false);
			}

			child = sibling;
		}
	}

	/**
	 * The opposite of `pause_effect`. We call this if (for example)
	 * `x` becomes falsy then truthy: `{#if x}...{/if}`
	 * @param {Effect} effect
	 */
	function resume_effect(effect) {
		resume_children(effect, true);
	}

	/**
	 * @param {Effect} effect
	 * @param {boolean} local
	 */
	function resume_children(effect, local) {
		if ((effect.f & INERT) === 0) return;
		effect.f ^= INERT;

		// If a dependency of this effect changed while it was paused,
		// schedule the effect to update. we don't use `is_dirty`
		// here because we don't want to eagerly recompute a derived like
		// `{#if foo}{foo.bar()}{/if}` if `foo` is now `undefined
		if ((effect.f & CLEAN) === 0) {
			set_signal_status(effect, DIRTY);
			Batch.ensure().schedule(effect); // Assumption: This happens during the commit phase of the batch, causing another flush, but it's safe
		}

		var child = effect.first;

		while (child !== null) {
			var sibling = child.next;
			var transparent = (child.f & EFFECT_TRANSPARENT) !== 0 || (child.f & BRANCH_EFFECT) !== 0;
			// TODO we don't need to call resume_children recursively with a linked list in place
			// it's slightly more involved though as we have to account for `transparent` changing
			// through the tree.
			resume_children(child, transparent ? local : false);
			child = sibling;
		}

		var t = effect.nodes && effect.nodes.t;

		if (t !== null) {
			for (const transition of t) {
				if (transition.is_global || local) {
					transition.in();
				}
			}
		}
	}

	/**
	 * @param {Effect} effect
	 * @param {DocumentFragment} fragment
	 */
	function move_effect(effect, fragment) {
		if (!effect.nodes) return;

		/** @type {TemplateNode | null} */
		var node = effect.nodes.start;
		var end = effect.nodes.end;

		while (node !== null) {
			/** @type {TemplateNode | null} */
			var next = node === end ? null : get_next_sibling(node);

			fragment.append(node);
			node = next;
		}
	}

	/** @import { Derived, Effect, Reaction, Source, Value } from '#client' */

	let is_updating_effect = false;

	let is_destroying_effect = false;

	/** @param {boolean} value */
	function set_is_destroying_effect(value) {
		is_destroying_effect = value;
	}

	/** @type {null | Reaction} */
	let active_reaction = null;

	let untracking = false;

	/** @param {null | Reaction} reaction */
	function set_active_reaction(reaction) {
		active_reaction = reaction;
	}

	/** @type {null | Effect} */
	let active_effect = null;

	/** @param {null | Effect} effect */
	function set_active_effect(effect) {
		active_effect = effect;
	}

	/**
	 * When sources are created within a reaction, reading and writing
	 * them within that reaction should not cause a re-run
	 * @type {null | Source[]}
	 */
	let current_sources = null;

	/** @param {Value} value */
	function push_reaction_value(value) {
		if (active_reaction !== null && (true)) {
			if (current_sources === null) {
				current_sources = [value];
			} else {
				current_sources.push(value);
			}
		}
	}

	/**
	 * The dependencies of the reaction that is currently being executed. In many cases,
	 * the dependencies are unchanged between runs, and so this will be `null` unless
	 * and until a new dependency is accessed — we track this via `skipped_deps`
	 * @type {null | Value[]}
	 */
	let new_deps = null;

	let skipped_deps = 0;

	/**
	 * Tracks writes that the effect it's executed in doesn't listen to yet,
	 * so that the dependency can be added to the effect later on if it then reads it
	 * @type {null | Source[]}
	 */
	let untracked_writes = null;

	/** @param {null | Source[]} value */
	function set_untracked_writes(value) {
		untracked_writes = value;
	}

	/**
	 * @type {number} Used by sources and deriveds for handling updates.
	 * Version starts from 1 so that unowned deriveds differentiate between a created effect and a run one for tracing
	 **/
	let write_version = 1;

	/** @type {number} Used to version each read of a source of derived to avoid duplicating depedencies inside a reaction */
	let read_version = 0;

	let update_version = read_version;

	/** @param {number} value */
	function set_update_version(value) {
		update_version = value;
	}

	function increment_write_version() {
		return ++write_version;
	}

	/**
	 * Determines whether a derived or effect is dirty.
	 * If it is MAYBE_DIRTY, will set the status to CLEAN
	 * @param {Reaction} reaction
	 * @returns {boolean}
	 */
	function is_dirty(reaction) {
		var flags = reaction.f;

		if ((flags & DIRTY) !== 0) {
			return true;
		}

		if (flags & DERIVED) {
			reaction.f &= ~WAS_MARKED;
		}

		if ((flags & MAYBE_DIRTY) !== 0) {
			var dependencies = /** @type {Value[]} */ (reaction.deps);
			var length = dependencies.length;

			for (var i = 0; i < length; i++) {
				var dependency = dependencies[i];

				if (is_dirty(/** @type {Derived} */ (dependency))) {
					update_derived(/** @type {Derived} */ (dependency));
				}

				if (dependency.wv > reaction.wv) {
					return true;
				}
			}

			if (
				(flags & CONNECTED) !== 0 &&
				// During time traveling we don't want to reset the status so that
				// traversal of the graph in the other batches still happens
				batch_values === null
			) {
				set_signal_status(reaction, CLEAN);
			}
		}

		return false;
	}

	/**
	 * @param {Value} signal
	 * @param {Effect} effect
	 * @param {boolean} [root]
	 */
	function schedule_possible_effect_self_invalidation(signal, effect, root = true) {
		var reactions = signal.reactions;
		if (reactions === null) return;

		if (current_sources !== null && includes.call(current_sources, signal)) {
			return;
		}

		for (var i = 0; i < reactions.length; i++) {
			var reaction = reactions[i];

			if ((reaction.f & DERIVED) !== 0) {
				schedule_possible_effect_self_invalidation(/** @type {Derived} */ (reaction), effect, false);
			} else if (effect === reaction) {
				if (root) {
					set_signal_status(reaction, DIRTY);
				} else if ((reaction.f & CLEAN) !== 0) {
					set_signal_status(reaction, MAYBE_DIRTY);
				}
				schedule_effect(/** @type {Effect} */ (reaction));
			}
		}
	}

	/** @param {Reaction} reaction */
	function update_reaction(reaction) {
		var previous_deps = new_deps;
		var previous_skipped_deps = skipped_deps;
		var previous_untracked_writes = untracked_writes;
		var previous_reaction = active_reaction;
		var previous_sources = current_sources;
		var previous_component_context = component_context;
		var previous_untracking = untracking;
		var previous_update_version = update_version;

		var flags = reaction.f;

		new_deps = /** @type {null | Value[]} */ (null);
		skipped_deps = 0;
		untracked_writes = null;
		active_reaction = (flags & (BRANCH_EFFECT | ROOT_EFFECT)) === 0 ? reaction : null;

		current_sources = null;
		set_component_context(reaction.ctx);
		untracking = false;
		update_version = ++read_version;

		if (reaction.ac !== null) {
			without_reactive_context(() => {
				/** @type {AbortController} */ (reaction.ac).abort(STALE_REACTION);
			});

			reaction.ac = null;
		}

		try {
			reaction.f |= REACTION_IS_UPDATING;
			var fn = /** @type {Function} */ (reaction.fn);
			var result = fn();
			reaction.f |= REACTION_RAN;
			var deps = reaction.deps;

			// Don't remove reactions during fork;
			// they must remain for when fork is discarded
			var is_fork = current_batch?.is_fork;

			if (new_deps !== null) {
				var i;

				if (!is_fork) {
					remove_reactions(reaction, skipped_deps);
				}

				if (deps !== null && skipped_deps > 0) {
					deps.length = skipped_deps + new_deps.length;
					for (i = 0; i < new_deps.length; i++) {
						deps[skipped_deps + i] = new_deps[i];
					}
				} else {
					reaction.deps = deps = new_deps;
				}

				if (effect_tracking() && (reaction.f & CONNECTED) !== 0) {
					for (i = skipped_deps; i < deps.length; i++) {
						(deps[i].reactions ??= []).push(reaction);
					}
				}
			} else if (!is_fork && deps !== null && skipped_deps < deps.length) {
				remove_reactions(reaction, skipped_deps);
				deps.length = skipped_deps;
			}

			// If we're inside an effect and we have untracked writes, then we need to
			// ensure that if any of those untracked writes result in re-invalidation
			// of the current effect, then that happens accordingly
			if (
				is_runes() &&
				untracked_writes !== null &&
				!untracking &&
				deps !== null &&
				(reaction.f & (DERIVED | MAYBE_DIRTY | DIRTY)) === 0
			) {
				for (i = 0; i < /** @type {Source[]} */ (untracked_writes).length; i++) {
					schedule_possible_effect_self_invalidation(
						untracked_writes[i],
						/** @type {Effect} */ (reaction)
					);
				}
			}

			// If we are returning to an previous reaction then
			// we need to increment the read version to ensure that
			// any dependencies in this reaction aren't marked with
			// the same version
			if (previous_reaction !== null && previous_reaction !== reaction) {
				read_version++;

				// update the `rv` of the previous reaction's deps — both existing and new —
				// so that they are not added again
				if (previous_reaction.deps !== null) {
					for (let i = 0; i < previous_skipped_deps; i += 1) {
						previous_reaction.deps[i].rv = read_version;
					}
				}

				if (previous_deps !== null) {
					for (const dep of previous_deps) {
						dep.rv = read_version;
					}
				}

				if (untracked_writes !== null) {
					if (previous_untracked_writes === null) {
						previous_untracked_writes = untracked_writes;
					} else {
						previous_untracked_writes.push(.../** @type {Source[]} */ (untracked_writes));
					}
				}
			}

			if ((reaction.f & ERROR_VALUE) !== 0) {
				reaction.f ^= ERROR_VALUE;
			}

			return result;
		} catch (error) {
			return handle_error(error);
		} finally {
			reaction.f ^= REACTION_IS_UPDATING;
			new_deps = previous_deps;
			skipped_deps = previous_skipped_deps;
			untracked_writes = previous_untracked_writes;
			active_reaction = previous_reaction;
			current_sources = previous_sources;
			set_component_context(previous_component_context);
			untracking = previous_untracking;
			update_version = previous_update_version;
		}
	}

	/**
	 * @template V
	 * @param {Reaction} signal
	 * @param {Value<V>} dependency
	 * @returns {void}
	 */
	function remove_reaction(signal, dependency) {
		let reactions = dependency.reactions;
		if (reactions !== null) {
			var index = index_of.call(reactions, signal);
			if (index !== -1) {
				var new_length = reactions.length - 1;
				if (new_length === 0) {
					reactions = dependency.reactions = null;
				} else {
					// Swap with last element and then remove.
					reactions[index] = reactions[new_length];
					reactions.pop();
				}
			}
		}

		// If the derived has no reactions, then we can disconnect it from the graph,
		// allowing it to either reconnect in the future, or be GC'd by the VM.
		if (
			reactions === null &&
			(dependency.f & DERIVED) !== 0 &&
			// Destroying a child effect while updating a parent effect can cause a dependency to appear
			// to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
			// allows us to skip the expensive work of disconnecting and immediately reconnecting it
			(new_deps === null || !includes.call(new_deps, dependency))
		) {
			var derived = /** @type {Derived} */ (dependency);

			// If we are working with a derived that is owned by an effect, then mark it as being
			// disconnected and remove the mark flag, as it cannot be reliably removed otherwise
			if ((derived.f & CONNECTED) !== 0) {
				derived.f ^= CONNECTED;
				derived.f &= ~WAS_MARKED;
			}

			// In a fork it's possible that a derived is executed and gets reactions, then commits, but is
			// never re-executed. This is possible when the derived is only executed once in the context
			// of a new branch which happens before fork.commit() runs. In this case, the derived still has
			// UNINITIALIZED as its value, and then when it's loosing its reactions we need to ensure it stays
			// DIRTY so it is reexecuted once someone wants its value again.
			if (derived.v !== UNINITIALIZED) {
				update_derived_status(derived);
			}

			// freeze any effects inside this derived
			freeze_derived_effects(derived);

			// Disconnect any reactions owned by this reaction
			remove_reactions(derived, 0);
		}
	}

	/**
	 * @param {Reaction} signal
	 * @param {number} start_index
	 * @returns {void}
	 */
	function remove_reactions(signal, start_index) {
		var dependencies = signal.deps;
		if (dependencies === null) return;

		for (var i = start_index; i < dependencies.length; i++) {
			remove_reaction(signal, dependencies[i]);
		}
	}

	/**
	 * @param {Effect} effect
	 * @returns {void}
	 */
	function update_effect(effect) {
		var flags = effect.f;

		if ((flags & DESTROYED) !== 0) {
			return;
		}

		set_signal_status(effect, CLEAN);

		var previous_effect = active_effect;
		var was_updating_effect = is_updating_effect;

		active_effect = effect;
		is_updating_effect = true;

		try {
			if ((flags & (BLOCK_EFFECT | MANAGED_EFFECT)) !== 0) {
				destroy_block_effect_children(effect);
			} else {
				destroy_effect_children(effect);
			}

			execute_effect_teardown(effect);
			var teardown = update_reaction(effect);
			effect.teardown = typeof teardown === 'function' ? teardown : null;
			effect.wv = write_version;

			// In DEV, increment versions of any sources that were written to during the effect,
			// so that they are correctly marked as dirty when the effect re-runs
			var dep; if (DEV && tracing_mode_flag && (effect.f & DIRTY) !== 0 && effect.deps !== null) ;
		} finally {
			is_updating_effect = was_updating_effect;
			active_effect = previous_effect;
		}
	}

	/**
	 * Returns a promise that resolves once any pending state changes have been applied.
	 * @returns {Promise<void>}
	 */
	async function tick() {

		await Promise.resolve();

		// By calling flushSync we guarantee that any pending state changes are applied after one tick.
		// TODO look into whether we can make flushing subsequent updates synchronously in the future.
		flushSync();
	}

	/**
	 * @template V
	 * @param {Value<V>} signal
	 * @returns {V}
	 */
	function get(signal) {
		var flags = signal.f;
		var is_derived = (flags & DERIVED) !== 0;

		// Register the dependency on the current reaction signal.
		if (active_reaction !== null && !untracking) {
			// if we're in a derived that is being read inside an _async_ derived,
			// it's possible that the effect was already destroyed. In this case,
			// we don't add the dependency, because that would create a memory leak
			var destroyed = active_effect !== null && (active_effect.f & DESTROYED) !== 0;

			if (!destroyed && (current_sources === null || !includes.call(current_sources, signal))) {
				var deps = active_reaction.deps;

				if ((active_reaction.f & REACTION_IS_UPDATING) !== 0) {
					// we're in the effect init/update cycle
					if (signal.rv < read_version) {
						signal.rv = read_version;

						// If the signal is accessing the same dependencies in the same
						// order as it did last time, increment `skipped_deps`
						// rather than updating `new_deps`, which creates GC cost
						if (new_deps === null && deps !== null && deps[skipped_deps] === signal) {
							skipped_deps++;
						} else if (new_deps === null) {
							new_deps = [signal];
						} else {
							new_deps.push(signal);
						}
					}
				} else {
					// we're adding a dependency outside the init/update cycle
					// (i.e. after an `await`)
					(active_reaction.deps ??= []).push(signal);

					var reactions = signal.reactions;

					if (reactions === null) {
						signal.reactions = [active_reaction];
					} else if (!includes.call(reactions, active_reaction)) {
						reactions.push(active_reaction);
					}
				}
			}
		}

		if (is_destroying_effect && old_values.has(signal)) {
			return old_values.get(signal);
		}

		if (is_derived) {
			var derived = /** @type {Derived} */ (signal);

			if (is_destroying_effect) {
				var value = derived.v;

				// if the derived is dirty and has reactions, or depends on the values that just changed, re-execute
				// (a derived can be maybe_dirty due to the effect destroy removing its last reaction)
				if (
					((derived.f & CLEAN) === 0 && derived.reactions !== null) ||
					depends_on_old_values(derived)
				) {
					value = execute_derived(derived);
				}

				old_values.set(derived, value);

				return value;
			}

			// connect disconnected deriveds if we are reading them inside an effect,
			// or inside another derived that is already connected
			var should_connect =
				(derived.f & CONNECTED) === 0 &&
				!untracking &&
				active_reaction !== null &&
				(is_updating_effect || (active_reaction.f & CONNECTED) !== 0);

			var is_new = (derived.f & REACTION_RAN) === 0;

			if (is_dirty(derived)) {
				if (should_connect) {
					// set the flag before `update_derived`, so that the derived
					// is added as a reaction to its dependencies
					derived.f |= CONNECTED;
				}

				update_derived(derived);
			}

			if (should_connect && !is_new) {
				unfreeze_derived_effects(derived);
				reconnect(derived);
			}
		}

		if (batch_values?.has(signal)) {
			return batch_values.get(signal);
		}

		if ((signal.f & ERROR_VALUE) !== 0) {
			throw signal.v;
		}

		return signal.v;
	}

	/**
	 * (Re)connect a disconnected derived, so that it is notified
	 * of changes in `mark_reactions`
	 * @param {Derived} derived
	 */
	function reconnect(derived) {
		derived.f |= CONNECTED;

		if (derived.deps === null) return;

		for (const dep of derived.deps) {
			(dep.reactions ??= []).push(derived);

			if ((dep.f & DERIVED) !== 0 && (dep.f & CONNECTED) === 0) {
				unfreeze_derived_effects(/** @type {Derived} */ (dep));
				reconnect(/** @type {Derived} */ (dep));
			}
		}
	}

	/** @param {Derived} derived */
	function depends_on_old_values(derived) {
		if (derived.v === UNINITIALIZED) return true; // we don't know, so assume the worst
		if (derived.deps === null) return false;

		for (const dep of derived.deps) {
			if (old_values.has(dep)) {
				return true;
			}

			if ((dep.f & DERIVED) !== 0 && depends_on_old_values(/** @type {Derived} */ (dep))) {
				return true;
			}
		}

		return false;
	}

	/**
	 * When used inside a [`$derived`](https://svelte.dev/docs/svelte/$derived) or [`$effect`](https://svelte.dev/docs/svelte/$effect),
	 * any state read inside `fn` will not be treated as a dependency.
	 *
	 * ```ts
	 * $effect(() => {
	 *   // this will run when `data` changes, but not when `time` changes
	 *   save(data, {
	 *     timestamp: untrack(() => time)
	 *   });
	 * });
	 * ```
	 * @template T
	 * @param {() => T} fn
	 * @returns {T}
	 */
	function untrack(fn) {
		var previous_untracking = untracking;
		try {
			untracking = true;
			return fn();
		} finally {
			untracking = previous_untracking;
		}
	}

	/**
	 * Possibly traverse an object and read all its properties so that they're all reactive in case this is `$state`.
	 * Does only check first level of an object for performance reasons (heuristic should be good for 99% of all cases).
	 * @param {any} value
	 * @returns {void}
	 */
	function deep_read_state(value) {
		if (typeof value !== 'object' || !value || value instanceof EventTarget) {
			return;
		}

		if (STATE_SYMBOL in value) {
			deep_read(value);
		} else if (!Array.isArray(value)) {
			for (let key in value) {
				const prop = value[key];
				if (typeof prop === 'object' && prop && STATE_SYMBOL in prop) {
					deep_read(prop);
				}
			}
		}
	}

	/**
	 * Deeply traverse an object and read all its properties
	 * so that they're all reactive in case this is `$state`
	 * @param {any} value
	 * @param {Set<any>} visited
	 * @returns {void}
	 */
	function deep_read(value, visited = new Set()) {
		if (
			typeof value === 'object' &&
			value !== null &&
			// We don't want to traverse DOM elements
			!(value instanceof EventTarget) &&
			!visited.has(value)
		) {
			visited.add(value);
			// When working with a possible SvelteDate, this
			// will ensure we capture changes to it.
			if (value instanceof Date) {
				value.getTime();
			}
			for (let key in value) {
				try {
					deep_read(value[key], visited);
				} catch (e) {
					// continue
				}
			}
			const proto = get_prototype_of(value);
			if (
				proto !== Object.prototype &&
				proto !== Array.prototype &&
				proto !== Map.prototype &&
				proto !== Set.prototype &&
				proto !== Date.prototype
			) {
				const descriptors = get_descriptors(proto);
				for (let key in descriptors) {
					const get = descriptors[key].get;
					if (get) {
						try {
							get.call(value);
						} catch (e) {
							// continue
						}
					}
				}
			}
		}
	}

	/**
	 * Used on elements, as a map of event type -> event handler,
	 * and on events themselves to track which element handled an event
	 */
	const event_symbol = Symbol('events');

	/** @type {Set<string>} */
	const all_registered_events = new Set();

	/** @type {Set<(events: Array<string>) => void>} */
	const root_event_handles = new Set();

	/**
	 * @param {string} event_name
	 * @param {EventTarget} dom
	 * @param {EventListener} [handler]
	 * @param {AddEventListenerOptions} [options]
	 */
	function create_event(event_name, dom, handler, options = {}) {
		/**
		 * @this {EventTarget}
		 */
		function target_handler(/** @type {Event} */ event) {
			if (!options.capture) {
				// Only call in the bubble phase, else delegated events would be called before the capturing events
				handle_event_propagation.call(dom, event);
			}
			if (!event.cancelBubble) {
				return without_reactive_context(() => {
					return handler?.call(this, event);
				});
			}
		}

		// Chrome has a bug where pointer events don't work when attached to a DOM element that has been cloned
		// with cloneNode() and the DOM element is disconnected from the document. To ensure the event works, we
		// defer the attachment till after it's been appended to the document. TODO: remove this once Chrome fixes
		// this bug. The same applies to wheel events and touch events.
		if (
			event_name.startsWith('pointer') ||
			event_name.startsWith('touch') ||
			event_name === 'wheel'
		) {
			queue_micro_task(() => {
				dom.addEventListener(event_name, target_handler, options);
			});
		} else {
			dom.addEventListener(event_name, target_handler, options);
		}

		return target_handler;
	}

	/**
	 * @param {string} event_name
	 * @param {Element} dom
	 * @param {EventListener} [handler]
	 * @param {boolean} [capture]
	 * @param {boolean} [passive]
	 * @returns {void}
	 */
	function event(event_name, dom, handler, capture, passive) {
		var options = { capture, passive };
		var target_handler = create_event(event_name, dom, handler, options);

		if (
			dom === document.body ||
			// @ts-ignore
			dom === window ||
			// @ts-ignore
			dom === document ||
			// Firefox has quirky behavior, it can happen that we still get "canplay" events when the element is already removed
			dom instanceof HTMLMediaElement
		) {
			teardown(() => {
				dom.removeEventListener(event_name, target_handler, options);
			});
		}
	}

	/**
	 * @param {string} event_name
	 * @param {Element} element
	 * @param {EventListener} [handler]
	 * @returns {void}
	 */
	function delegated(event_name, element, handler) {
		// @ts-expect-error
		(element[event_symbol] ??= {})[event_name] = handler;
	}

	/**
	 * @param {Array<string>} events
	 * @returns {void}
	 */
	function delegate(events) {
		for (var i = 0; i < events.length; i++) {
			all_registered_events.add(events[i]);
		}

		for (var fn of root_event_handles) {
			fn(events);
		}
	}

	// used to store the reference to the currently propagated event
	// to prevent garbage collection between microtasks in Firefox
	// If the event object is GCed too early, the expando __root property
	// set on the event object is lost, causing the event delegation
	// to process the event twice
	let last_propagated_event = null;

	/**
	 * @this {EventTarget}
	 * @param {Event} event
	 * @returns {void}
	 */
	function handle_event_propagation(event) {
		var handler_element = this;
		var owner_document = /** @type {Node} */ (handler_element).ownerDocument;
		var event_name = event.type;
		var path = event.composedPath?.() || [];
		var current_target = /** @type {null | Element} */ (path[0] || event.target);

		last_propagated_event = event;

		// composedPath contains list of nodes the event has propagated through.
		// We check `event_symbol` to skip all nodes below it in case this is a
		// parent of the `event_symbol` node, which indicates that there's nested
		// mounted apps. In this case we don't want to trigger events multiple times.
		var path_idx = 0;

		// the `last_propagated_event === event` check is redundant, but
		// without it the variable will be DCE'd and things will
		// fail mysteriously in Firefox
		// @ts-expect-error is added below
		var handled_at = last_propagated_event === event && event[event_symbol];

		if (handled_at) {
			var at_idx = path.indexOf(handled_at);
			if (
				at_idx !== -1 &&
				(handler_element === document || handler_element === /** @type {any} */ (window))
			) {
				// This is the fallback document listener or a window listener, but the event was already handled
				// -> ignore, but set handle_at to document/window so that we're resetting the event
				// chain in case someone manually dispatches the same event object again.
				// @ts-expect-error
				event[event_symbol] = handler_element;
				return;
			}

			// We're deliberately not skipping if the index is higher, because
			// someone could create an event programmatically and emit it multiple times,
			// in which case we want to handle the whole propagation chain properly each time.
			// (this will only be a false negative if the event is dispatched multiple times and
			// the fallback document listener isn't reached in between, but that's super rare)
			var handler_idx = path.indexOf(handler_element);
			if (handler_idx === -1) {
				// handle_idx can theoretically be -1 (happened in some JSDOM testing scenarios with an event listener on the window object)
				// so guard against that, too, and assume that everything was handled at this point.
				return;
			}

			if (at_idx <= handler_idx) {
				path_idx = at_idx;
			}
		}

		current_target = /** @type {Element} */ (path[path_idx] || event.target);
		// there can only be one delegated event per element, and we either already handled the current target,
		// or this is the very first target in the chain which has a non-delegated listener, in which case it's safe
		// to handle a possible delegated event on it later (through the root delegation listener for example).
		if (current_target === handler_element) return;

		// Proxy currentTarget to correct target
		define_property(event, 'currentTarget', {
			configurable: true,
			get() {
				return current_target || owner_document;
			}
		});

		// This started because of Chromium issue https://chromestatus.com/feature/5128696823545856,
		// where removal or moving of of the DOM can cause sync `blur` events to fire, which can cause logic
		// to run inside the current `active_reaction`, which isn't what we want at all. However, on reflection,
		// it's probably best that all event handled by Svelte have this behaviour, as we don't really want
		// an event handler to run in the context of another reaction or effect.
		var previous_reaction = active_reaction;
		var previous_effect = active_effect;
		set_active_reaction(null);
		set_active_effect(null);

		try {
			/**
			 * @type {unknown}
			 */
			var throw_error;
			/**
			 * @type {unknown[]}
			 */
			var other_errors = [];

			while (current_target !== null) {
				/** @type {null | Element} */
				var parent_element =
					current_target.assignedSlot ||
					current_target.parentNode ||
					/** @type {any} */ (current_target).host ||
					null;

				try {
					// @ts-expect-error
					var delegated = current_target[event_symbol]?.[event_name];

					if (
						delegated != null &&
						(!(/** @type {any} */ (current_target).disabled) ||
							// DOM could've been updated already by the time this is reached, so we check this as well
							// -> the target could not have been disabled because it emits the event in the first place
							event.target === current_target)
					) {
						delegated.call(current_target, event);
					}
				} catch (error) {
					if (throw_error) {
						other_errors.push(error);
					} else {
						throw_error = error;
					}
				}
				if (event.cancelBubble || parent_element === handler_element || parent_element === null) {
					break;
				}
				current_target = parent_element;
			}

			if (throw_error) {
				for (let error of other_errors) {
					// Throw the rest of the errors, one-by-one on a microtask
					queueMicrotask(() => {
						throw error;
					});
				}
				throw throw_error;
			}
		} finally {
			// @ts-expect-error is used above
			event[event_symbol] = handler_element;
			// @ts-ignore remove proxy on currentTarget
			delete event.currentTarget;
			set_active_reaction(previous_reaction);
			set_active_effect(previous_effect);
		}
	}

	/**
	 * In dev, warn if an event handler is not a function, as it means the
	 * user probably called the handler or forgot to add a `() =>`
	 * @param {() => (event: Event, ...args: any) => void} thunk
	 * @param {EventTarget} element
	 * @param {[Event, ...any]} args
	 * @param {any} component
	 * @param {[number, number]} [loc]
	 * @param {boolean} [remove_parens]
	 */
	function apply(
		thunk,
		element,
		args,
		component,
		loc,
		has_side_effects = false,
		remove_parens = false
	) {
		let handler;
		let error;

		try {
			handler = thunk();
		} catch (e) {
			error = e;
		}

		if (typeof handler !== 'function' && (has_side_effects || handler != null || error)) {
			component?.[FILENAME];
			const phase = args[0]?.eventPhase < Event.BUBBLING_PHASE ? 'capture' : '';
			args[0]?.type + phase;

			event_handler_invalid();

			if (error) {
				throw error;
			}
		}
		handler?.apply(element, args);
	}

	const policy =
		// We gotta write it like this because after downleveling the pure comment may end up in the wrong location
		globalThis?.window?.trustedTypes &&
		/* @__PURE__ */ globalThis.window.trustedTypes.createPolicy('svelte-trusted-html', {
			/** @param {string} html */
			createHTML: (html) => {
				return html;
			}
		});

	/** @param {string} html */
	function create_trusted_html(html) {
		return /** @type {string} */ (policy?.createHTML(html) ?? html);
	}

	/**
	 * @param {string} html
	 */
	function create_fragment_from_html(html) {
		var elem = create_element('template');
		elem.innerHTML = create_trusted_html(html.replaceAll('<!>', '<!---->')); // XHTML compliance
		return elem.content;
	}

	/** @import { Effect, EffectNodes, TemplateNode } from '#client' */
	/** @import { TemplateStructure } from './types' */

	/**
	 * @param {TemplateNode} start
	 * @param {TemplateNode | null} end
	 */
	function assign_nodes(start, end) {
		var effect = /** @type {Effect} */ (active_effect);
		if (effect.nodes === null) {
			effect.nodes = { start, end, a: null, t: null };
		}
	}

	/**
	 * @param {string} content
	 * @param {number} flags
	 * @returns {() => Node | Node[]}
	 */
	/*#__NO_SIDE_EFFECTS__*/
	function from_html(content, flags) {
		var is_fragment = (flags & TEMPLATE_FRAGMENT) !== 0;
		var use_import_node = (flags & TEMPLATE_USE_IMPORT_NODE) !== 0;

		/** @type {Node} */
		var node;

		/**
		 * Whether or not the first item is a text/element node. If not, we need to
		 * create an additional comment node to act as `effect.nodes.start`
		 */
		var has_start = !content.startsWith('<!>');

		return () => {

			if (node === undefined) {
				node = create_fragment_from_html(has_start ? content : '<!>' + content);
				if (!is_fragment) node = /** @type {TemplateNode} */ (get_first_child(node));
			}

			var clone = /** @type {TemplateNode} */ (
				use_import_node || is_firefox ? document.importNode(node, true) : node.cloneNode(true)
			);

			if (is_fragment) {
				var start = /** @type {TemplateNode} */ (get_first_child(clone));
				var end = /** @type {TemplateNode} */ (clone.lastChild);

				assign_nodes(start, end);
			} else {
				assign_nodes(clone, clone);
			}

			return clone;
		};
	}

	/**
	 * @returns {TemplateNode | DocumentFragment}
	 */
	function comment() {

		var frag = document.createDocumentFragment();
		var start = document.createComment('');
		var anchor = create_text();
		frag.append(start, anchor);

		assign_nodes(start, anchor);

		return frag;
	}

	/**
	 * Assign the created (or in hydration mode, traversed) dom elements to the current block
	 * and insert the elements into the dom (in client mode).
	 * @param {Text | Comment | Element} anchor
	 * @param {DocumentFragment | Element} dom
	 */
	function append(anchor, dom) {

		if (anchor === null) {
			// edge case — void `<svelte:element>` with content
			return;
		}

		anchor.before(/** @type {Node} */ (dom));
	}

	/**
	 * Subset of delegated events which should be passive by default.
	 * These two are already passive via browser defaults on window, document and body.
	 * But since
	 * - we're delegating them
	 * - they happen often
	 * - they apply to mobile which is generally less performant
	 * we're marking them as passive by default for other elements, too.
	 */
	const PASSIVE_EVENTS = ['touchstart', 'touchmove'];

	/**
	 * Returns `true` if `name` is a passive event
	 * @param {string} name
	 */
	function is_passive_event(name) {
		return PASSIVE_EVENTS.includes(name);
	}

	/**
	 * Prevent devtools trying to make `location` a clickable link by inserting a zero-width space
	 * @template {string | undefined} T
	 * @param {T} location
	 * @returns {T};
	 */
	function sanitize_location(location) {
		return /** @type {T} */ (location?.replace(/\//g, '/\u200b'));
	}

	/** @import { ComponentContext, Effect, EffectNodes, TemplateNode } from '#client' */
	/** @import { Component, ComponentType, SvelteComponent, MountOptions } from '../../index.js' */

	/**
	 * This is normally true — block effects should run their intro transitions —
	 * but is false during hydration (unless `options.intro` is `true`) and
	 * when creating the children of a `<svelte:element>` that just changed tag
	 */
	let should_intro = true;

	/**
	 * @param {Element} text
	 * @param {string} value
	 * @returns {void}
	 */
	function set_text(text, value) {
		// For objects, we apply string coercion (which might make things like $state array references in the template reactive) before diffing
		var str = value == null ? '' : typeof value === 'object' ? `${value}` : value;
		// @ts-expect-error
		if (str !== (text.__t ??= text.nodeValue)) {
			// @ts-expect-error
			text.__t = str;
			text.nodeValue = `${str}`;
		}
	}

	/**
	 * Mounts a component to the given target and returns the exports and potentially the props (if compiled with `accessors: true`) of the component.
	 * Transitions will play during the initial render unless the `intro` option is set to `false`.
	 *
	 * @template {Record<string, any>} Props
	 * @template {Record<string, any>} Exports
	 * @param {ComponentType<SvelteComponent<Props>> | Component<Props, Exports, any>} component
	 * @param {MountOptions<Props>} options
	 * @returns {Exports}
	 */
	function mount(component, options) {
		return _mount(component, options);
	}

	/** @type {Map<EventTarget, Map<string, number>>} */
	const listeners = new Map();

	/**
	 * @template {Record<string, any>} Exports
	 * @param {ComponentType<SvelteComponent<any>> | Component<any>} Component
	 * @param {MountOptions} options
	 * @returns {Exports}
	 */
	function _mount(
		Component,
		{ target, anchor, props = {}, events, context, intro = true, transformError }
	) {
		init_operations();

		/** @type {Exports} */
		// @ts-expect-error will be defined because the render effect runs synchronously
		var component = undefined;

		var unmount = component_root(() => {
			var anchor_node = anchor ?? target.appendChild(create_text());

			boundary(
				/** @type {TemplateNode} */ (anchor_node),
				{
					pending: () => {}
				},
				(anchor_node) => {
					push({});
					var ctx = /** @type {ComponentContext} */ (component_context);
					if (context) ctx.c = context;

					if (events) {
						// We can't spread the object or else we'd lose the state proxy stuff, if it is one
						/** @type {any} */ (props).$$events = events;
					}

					should_intro = intro;
					// @ts-expect-error the public typings are not what the actual function looks like
					component = Component(anchor_node, props) || {};
					should_intro = true;

					pop();
				},
				transformError
			);

			// Setup event delegation _after_ component is mounted - if an error would happen during mount, it would otherwise not be cleaned up
			/** @type {Set<string>} */
			var registered_events = new Set();

			/** @param {Array<string>} events */
			var event_handle = (events) => {
				for (var i = 0; i < events.length; i++) {
					var event_name = events[i];

					if (registered_events.has(event_name)) continue;
					registered_events.add(event_name);

					var passive = is_passive_event(event_name);

					// Add the event listener to both the container and the document.
					// The container listener ensures we catch events from within in case
					// the outer content stops propagation of the event.
					//
					// The document listener ensures we catch events that originate from elements that were
					// manually moved outside of the container (e.g. via manual portals).
					for (const node of [target, document]) {
						var counts = listeners.get(node);

						if (counts === undefined) {
							counts = new Map();
							listeners.set(node, counts);
						}

						var count = counts.get(event_name);

						if (count === undefined) {
							node.addEventListener(event_name, handle_event_propagation, { passive });
							counts.set(event_name, 1);
						} else {
							counts.set(event_name, count + 1);
						}
					}
				}
			};

			event_handle(array_from(all_registered_events));
			root_event_handles.add(event_handle);

			return () => {
				for (var event_name of registered_events) {
					for (const node of [target, document]) {
						var counts = /** @type {Map<string, number>} */ (listeners.get(node));
						var count = /** @type {number} */ (counts.get(event_name));

						if (--count == 0) {
							node.removeEventListener(event_name, handle_event_propagation);
							counts.delete(event_name);

							if (counts.size === 0) {
								listeners.delete(node);
							}
						} else {
							counts.set(event_name, count);
						}
					}
				}

				root_event_handles.delete(event_handle);

				if (anchor_node !== anchor) {
					anchor_node.parentNode?.removeChild(anchor_node);
				}
			};
		});

		mounted_components.set(component, unmount);
		return component;
	}

	/**
	 * References of the components that were mounted or hydrated.
	 * Uses a `WeakMap` to avoid memory leaks.
	 */
	let mounted_components = new WeakMap();

	/**
	 * @param {any} store
	 * @param {string} name
	 */
	function validate_store(store, name) {
		if (store != null && typeof store.subscribe !== 'function') {
			store_invalid_shape();
		}
	}

	/** @import { Effect, TemplateNode } from '#client' */

	/**
	 * @typedef {{ effect: Effect, fragment: DocumentFragment }} Branch
	 */

	/**
	 * @template Key
	 */
	class BranchManager {
		/** @type {TemplateNode} */
		anchor;

		/** @type {Map<Batch, Key>} */
		#batches = new Map();

		/**
		 * Map of keys to effects that are currently rendered in the DOM.
		 * These effects are visible and actively part of the document tree.
		 * Example:
		 * ```
		 * {#if condition}
		 * 	foo
		 * {:else}
		 * 	bar
		 * {/if}
		 * ```
		 * Can result in the entries `true->Effect` and `false->Effect`
		 * @type {Map<Key, Effect>}
		 */
		#onscreen = new Map();

		/**
		 * Similar to #onscreen with respect to the keys, but contains branches that are not yet
		 * in the DOM, because their insertion is deferred.
		 * @type {Map<Key, Branch>}
		 */
		#offscreen = new Map();

		/**
		 * Keys of effects that are currently outroing
		 * @type {Set<Key>}
		 */
		#outroing = new Set();

		/**
		 * Whether to pause (i.e. outro) on change, or destroy immediately.
		 * This is necessary for `<svelte:element>`
		 */
		#transition = true;

		/**
		 * @param {TemplateNode} anchor
		 * @param {boolean} transition
		 */
		constructor(anchor, transition = true) {
			this.anchor = anchor;
			this.#transition = transition;
		}

		/**
		 * @param {Batch} batch
		 */
		#commit = (batch) => {
			// if this batch was made obsolete, bail
			if (!this.#batches.has(batch)) return;

			var key = /** @type {Key} */ (this.#batches.get(batch));

			var onscreen = this.#onscreen.get(key);

			if (onscreen) {
				// effect is already in the DOM — abort any current outro
				resume_effect(onscreen);
				this.#outroing.delete(key);
			} else {
				// effect is currently offscreen. put it in the DOM
				var offscreen = this.#offscreen.get(key);

				if (offscreen) {
					this.#onscreen.set(key, offscreen.effect);
					this.#offscreen.delete(key);

					// remove the anchor...
					/** @type {TemplateNode} */ (offscreen.fragment.lastChild).remove();

					// ...and append the fragment
					this.anchor.before(offscreen.fragment);
					onscreen = offscreen.effect;
				}
			}

			for (const [b, k] of this.#batches) {
				this.#batches.delete(b);

				if (b === batch) {
					// keep values for newer batches
					break;
				}

				const offscreen = this.#offscreen.get(k);

				if (offscreen) {
					// for older batches, destroy offscreen effects
					// as they will never be committed
					destroy_effect(offscreen.effect);
					this.#offscreen.delete(k);
				}
			}

			// outro/destroy all onscreen effects...
			for (const [k, effect] of this.#onscreen) {
				// ...except the one that was just committed
				//    or those that are already outroing (else the transition is aborted and the effect destroyed right away)
				if (k === key || this.#outroing.has(k)) continue;

				const on_destroy = () => {
					const keys = Array.from(this.#batches.values());

					if (keys.includes(k)) {
						// keep the effect offscreen, as another batch will need it
						var fragment = document.createDocumentFragment();
						move_effect(effect, fragment);

						fragment.append(create_text()); // TODO can we avoid this?

						this.#offscreen.set(k, { effect, fragment });
					} else {
						destroy_effect(effect);
					}

					this.#outroing.delete(k);
					this.#onscreen.delete(k);
				};

				if (this.#transition || !onscreen) {
					this.#outroing.add(k);
					pause_effect(effect, on_destroy, false);
				} else {
					on_destroy();
				}
			}
		};

		/**
		 * @param {Batch} batch
		 */
		#discard = (batch) => {
			this.#batches.delete(batch);

			const keys = Array.from(this.#batches.values());

			for (const [k, branch] of this.#offscreen) {
				if (!keys.includes(k)) {
					destroy_effect(branch.effect);
					this.#offscreen.delete(k);
				}
			}
		};

		/**
		 *
		 * @param {any} key
		 * @param {null | ((target: TemplateNode) => void)} fn
		 */
		ensure(key, fn) {
			var batch = /** @type {Batch} */ (current_batch);
			var defer = should_defer_append();

			if (fn && !this.#onscreen.has(key) && !this.#offscreen.has(key)) {
				if (defer) {
					var fragment = document.createDocumentFragment();
					var target = create_text();

					fragment.append(target);

					this.#offscreen.set(key, {
						effect: branch(() => fn(target)),
						fragment
					});
				} else {
					this.#onscreen.set(
						key,
						branch(() => fn(this.anchor))
					);
				}
			}

			this.#batches.set(batch, key);

			if (defer) {
				for (const [k, effect] of this.#onscreen) {
					if (k === key) {
						batch.unskip_effect(effect);
					} else {
						batch.skip_effect(effect);
					}
				}

				for (const [k, branch] of this.#offscreen) {
					if (k === key) {
						batch.unskip_effect(branch.effect);
					} else {
						batch.skip_effect(branch.effect);
					}
				}

				batch.oncommit(this.#commit);
				batch.ondiscard(this.#discard);
			} else {

				this.#commit(batch);
			}
		}
	}

	/** @import { ComponentContext, ComponentContextLegacy } from '#client' */
	/** @import { EventDispatcher } from './index.js' */
	/** @import { NotFunction } from './internal/types.js' */

	/**
	 * `onMount`, like [`$effect`](https://svelte.dev/docs/svelte/$effect), schedules a function to run as soon as the component has been mounted to the DOM.
	 * Unlike `$effect`, the provided function only runs once.
	 *
	 * It must be called during the component's initialisation (but doesn't need to live _inside_ the component;
	 * it can be called from an external module). If a function is returned _synchronously_ from `onMount`,
	 * it will be called when the component is unmounted.
	 *
	 * `onMount` functions do not run during [server-side rendering](https://svelte.dev/docs/svelte/svelte-server#render).
	 *
	 * @template T
	 * @param {() => NotFunction<T> | Promise<NotFunction<T>> | (() => any)} fn
	 * @returns {void}
	 */
	function onMount(fn) {
		if (component_context === null) {
			lifecycle_outside_component();
		}

		if (legacy_mode_flag && component_context.l !== null) {
			init_update_callbacks(component_context).m.push(fn);
		} else {
			user_effect(() => {
				const cleanup = untrack(fn);
				if (typeof cleanup === 'function') return /** @type {() => void} */ (cleanup);
			});
		}
	}

	/**
	 * Schedules a callback to run immediately before the component is unmounted.
	 *
	 * Out of `onMount`, `beforeUpdate`, `afterUpdate` and `onDestroy`, this is the
	 * only one that runs inside a server-side component.
	 *
	 * @param {() => any} fn
	 * @returns {void}
	 */
	function onDestroy(fn) {
		if (component_context === null) {
			lifecycle_outside_component();
		}

		onMount(() => () => untrack(fn));
	}

	/**
	 * Legacy-mode: Init callbacks object for onMount/beforeUpdate/afterUpdate
	 * @param {ComponentContext} context
	 */
	function init_update_callbacks(context) {
		var l = /** @type {ComponentContextLegacy} */ (context).l;
		return (l.u ??= { a: [], b: [], m: [] });
	}

	/** @import { SourceLocation } from '#client' */

	/**
	 * @param {any} fn
	 * @param {string} filename
	 * @param {SourceLocation[]} locations
	 * @returns {any}
	 */
	function add_locations(fn, filename, locations) {
		return (/** @type {any[]} */ ...args) => {
			const dom = fn(...args);

			var node = dom.nodeType === DOCUMENT_FRAGMENT_NODE ? dom.firstChild : dom;
			assign_locations(node, filename, locations);

			return dom;
		};
	}

	/**
	 * @param {Element} element
	 * @param {string} filename
	 * @param {SourceLocation} location
	 */
	function assign_location(element, filename, location) {
		// @ts-expect-error
		element.__svelte_meta = {
			parent: dev_stack,
			loc: { file: filename, line: location[0], column: location[1] }
		};

		if (location[2]) {
			assign_locations(element.firstChild, filename, location[2]);
		}
	}

	/**
	 * @param {Node | null} node
	 * @param {string} filename
	 * @param {SourceLocation[]} locations
	 */
	function assign_locations(node, filename, locations) {
		var i = 0;

		while (node && i < locations.length) {

			if (node.nodeType === ELEMENT_NODE) {
				assign_location(/** @type {Element} */ (node), filename, locations[i++]);
			}

			node = node.nextSibling;
		}
	}

	/** @typedef {{ file: string, line: number, column: number }} Location */


	/**
	 * Sets up a validator that
	 * - traverses the path of a prop to find out if it is allowed to be mutated
	 * - checks that the binding chain is not interrupted
	 * @param {Record<string, any>} props
	 */
	function create_ownership_validator(props) {
		const component = component_context?.function;
		const parent = component_context?.p?.function;

		return {
			/**
			 * @param {string} prop
			 * @param {any[]} path
			 * @param {any} result
			 * @param {number} line
			 * @param {number} column
			 */
			mutation: (prop, path, result, line, column) => {
				const name = path[0];
				if (is_bound_or_unset(props, name) || !parent) {
					return result;
				}

				/** @type {any} */
				let value = props;

				for (let i = 0; i < path.length - 1; i++) {
					value = value[path[i]];
					if (!value?.[STATE_SYMBOL]) {
						return result;
					}
				}

				const location = sanitize_location(`${component[FILENAME]}:${line}:${column}`);

				ownership_invalid_mutation(name, location, prop, parent[FILENAME]);

				return result;
			},
			/**
			 * @param {any} key
			 * @param {any} child_component
			 * @param {() => any} value
			 */
			binding: (key, child_component, value) => {
				if (!is_bound_or_unset(props, key) && parent && value()?.[STATE_SYMBOL]) {
					ownership_invalid_binding(
						component[FILENAME],
						key,
						child_component[FILENAME],
						parent[FILENAME]
					);
				}
			}
		};
	}

	/**
	 * @param {Record<string, any>} props
	 * @param {string} prop_name
	 */
	function is_bound_or_unset(props, prop_name) {
		// Can be the case when someone does `mount(Component, props)` with `let props = $state({...})`
		// or `createClassComponent(Component, props)`
		const is_entry_props = STATE_SYMBOL in props || LEGACY_PROPS in props;
		return (
			!!get_descriptor(props, prop_name)?.set ||
			(is_entry_props && prop_name in props) ||
			!(prop_name in props)
		);
	}

	/** @param {Function & { [FILENAME]: string }} target */
	function check_target(target) {
		if (target) {
			component_api_invalid_new(target[FILENAME] ?? 'a component', target.name);
		}
	}

	function legacy_api() {
		const component = component_context?.function;

		/** @param {string} method */
		function error(method) {
			component_api_changed(method, component[FILENAME]);
		}

		return {
			$destroy: () => error('$destroy()'),
			$on: () => error('$on(...)'),
			$set: () => error('$set(...)')
		};
	}

	/** @import { TemplateNode } from '#client' */

	/**
	 * @param {TemplateNode} node
	 * @param {(branch: (fn: (anchor: Node) => void, key?: number | false) => void) => void} fn
	 * @param {boolean} [elseif] True if this is an `{:else if ...}` block rather than an `{#if ...}`, as that affects which transitions are considered 'local'
	 * @returns {void}
	 */
	function if_block(node, fn, elseif = false) {

		var branches = new BranchManager(node);
		var flags = elseif ? EFFECT_TRANSPARENT : 0;

		/**
		 * @param {number | false} key
		 * @param {null | ((anchor: Node) => void)} fn
		 */
		function update_branch(key, fn) {

			branches.ensure(key, fn);
		}

		block(() => {
			var has_branch = false;

			fn((fn, key = 0) => {
				has_branch = true;
				update_branch(key, fn);
			});

			if (!has_branch) {
				update_branch(-1, null);
			}
		}, flags);
	}

	/** @import { EachItem, EachOutroGroup, EachState, Effect, EffectNodes, MaybeSource, Source, TemplateNode, TransitionManager, Value } from '#client' */
	/** @import { Batch } from '../../reactivity/batch.js'; */

	// When making substantive changes to this file, validate them with the each block stress test:
	// https://svelte.dev/playground/1972b2cf46564476ad8c8c6405b23b7b
	// This test also exists in this repo, as `packages/svelte/tests/manual/each-stress-test`

	/**
	 * @param {any} _
	 * @param {number} i
	 */
	function index(_, i) {
		return i;
	}

	/**
	 * Pause multiple effects simultaneously, and coordinate their
	 * subsequent destruction. Used in each blocks
	 * @param {EachState} state
	 * @param {Effect[]} to_destroy
	 * @param {null | Node} controlled_anchor
	 */
	function pause_effects(state, to_destroy, controlled_anchor) {
		/** @type {TransitionManager[]} */
		var transitions = [];
		var length = to_destroy.length;

		/** @type {EachOutroGroup} */
		var group;
		var remaining = to_destroy.length;

		for (var i = 0; i < length; i++) {
			let effect = to_destroy[i];

			pause_effect(
				effect,
				() => {
					if (group) {
						group.pending.delete(effect);
						group.done.add(effect);

						if (group.pending.size === 0) {
							var groups = /** @type {Set<EachOutroGroup>} */ (state.outrogroups);

							destroy_effects(state, array_from(group.done));
							groups.delete(group);

							if (groups.size === 0) {
								state.outrogroups = null;
							}
						}
					} else {
						remaining -= 1;
					}
				},
				false
			);
		}

		if (remaining === 0) {
			// If we're in a controlled each block (i.e. the block is the only child of an
			// element), and we are removing all items, _and_ there are no out transitions,
			// we can use the fast path — emptying the element and replacing the anchor
			var fast_path = transitions.length === 0 && controlled_anchor !== null;

			if (fast_path) {
				var anchor = /** @type {Element} */ (controlled_anchor);
				var parent_node = /** @type {Element} */ (anchor.parentNode);

				clear_text_content(parent_node);
				parent_node.append(anchor);

				state.items.clear();
			}

			destroy_effects(state, to_destroy, !fast_path);
		} else {
			group = {
				pending: new Set(to_destroy),
				done: new Set()
			};

			(state.outrogroups ??= new Set()).add(group);
		}
	}

	/**
	 * @param {EachState} state
	 * @param {Effect[]} to_destroy
	 * @param {boolean} remove_dom
	 */
	function destroy_effects(state, to_destroy, remove_dom = true) {
		/** @type {Set<Effect> | undefined} */
		var preserved_effects;

		// The loop-in-a-loop isn't ideal, but we should only hit this in relatively rare cases
		if (state.pending.size > 0) {
			preserved_effects = new Set();

			for (const keys of state.pending.values()) {
				for (const key of keys) {
					preserved_effects.add(/** @type {EachItem} */ (state.items.get(key)).e);
				}
			}
		}

		for (var i = 0; i < to_destroy.length; i++) {
			var e = to_destroy[i];

			if (preserved_effects?.has(e)) {
				e.f |= EFFECT_OFFSCREEN;

				const fragment = document.createDocumentFragment();
				move_effect(e, fragment);
			} else {
				destroy_effect(to_destroy[i], remove_dom);
			}
		}
	}

	/** @type {TemplateNode} */
	var offscreen_anchor;

	/**
	 * @template V
	 * @param {Element | Comment} node The next sibling node, or the parent node if this is a 'controlled' block
	 * @param {number} flags
	 * @param {() => V[]} get_collection
	 * @param {(value: V, index: number) => any} get_key
	 * @param {(anchor: Node, item: MaybeSource<V>, index: MaybeSource<number>) => void} render_fn
	 * @param {null | ((anchor: Node) => void)} fallback_fn
	 * @returns {void}
	 */
	function each(node, flags, get_collection, get_key, render_fn, fallback_fn = null) {
		var anchor = node;

		/** @type {Map<any, EachItem>} */
		var items = new Map();

		var is_controlled = (flags & EACH_IS_CONTROLLED) !== 0;

		if (is_controlled) {
			var parent_node = /** @type {Element} */ (node);

			anchor = parent_node.appendChild(create_text());
		}

		/** @type {Effect | null} */
		var fallback = null;

		// TODO: ideally we could use derived for runes mode but because of the ability
		// to use a store which can be mutated, we can't do that here as mutating a store
		// will still result in the collection array being the same from the store
		var each_array = derived_safe_equal(() => {
			var collection = get_collection();

			return is_array(collection) ? collection : collection == null ? [] : array_from(collection);
		});

		/** @type {V[]} */
		var array;

		/** @type {Map<Batch, Set<any>>} */
		var pending = new Map();

		var first_run = true;

		/**
		 * @param {Batch} batch
		 */
		function commit(batch) {
			if ((state.effect.f & DESTROYED) !== 0) {
				return;
			}

			state.pending.delete(batch);

			state.fallback = fallback;
			reconcile(state, array, anchor, flags, get_key);

			if (fallback !== null) {
				if (array.length === 0) {
					if ((fallback.f & EFFECT_OFFSCREEN) === 0) {
						resume_effect(fallback);
					} else {
						fallback.f ^= EFFECT_OFFSCREEN;
						move(fallback, null, anchor);
					}
				} else {
					pause_effect(fallback, () => {
						// TODO only null out if no pending batch needs it,
						// otherwise re-add `fallback.fragment` and move the
						// effect into it
						fallback = null;
					});
				}
			}
		}

		/**
		 * @param {Batch} batch
		 */
		function discard(batch) {
			state.pending.delete(batch);
		}

		var effect = block(() => {
			array = /** @type {V[]} */ (get(each_array));
			var length = array.length;

			var keys = new Set();
			var batch = /** @type {Batch} */ (current_batch);
			var defer = should_defer_append();

			for (var index = 0; index < length; index += 1) {

				var value = array[index];
				var key = get_key(value, index);

				var item = first_run ? null : items.get(key);

				if (item) {
					// update before reconciliation, to trigger any async updates
					if (item.v) internal_set(item.v, value);
					if (item.i) internal_set(item.i, index);

					if (defer) {
						batch.unskip_effect(item.e);
					}
				} else {
					item = create_item(
						items,
						first_run ? anchor : (offscreen_anchor ??= create_text()),
						value,
						key,
						index,
						render_fn,
						flags,
						get_collection
					);

					if (!first_run) {
						item.e.f |= EFFECT_OFFSCREEN;
					}

					items.set(key, item);
				}

				keys.add(key);
			}

			if (length === 0 && fallback_fn && !fallback) {
				if (first_run) {
					fallback = branch(() => fallback_fn(anchor));
				} else {
					fallback = branch(() => fallback_fn((offscreen_anchor ??= create_text())));
					fallback.f |= EFFECT_OFFSCREEN;
				}
			}

			if (length > keys.size) {
				{
					// in prod, the additional information isn't printed, so don't bother computing it
					each_key_duplicate();
				}
			}

			if (!first_run) {
				pending.set(batch, keys);

				if (defer) {
					for (const [key, item] of items) {
						if (!keys.has(key)) {
							batch.skip_effect(item.e);
						}
					}

					batch.oncommit(commit);
					batch.ondiscard(discard);
				} else {
					commit(batch);
				}
			}

			// When we mount the each block for the first time, the collection won't be
			// connected to this effect as the effect hasn't finished running yet and its deps
			// won't be assigned. However, it's possible that when reconciling the each block
			// that a mutation occurred and it's made the collection MAYBE_DIRTY, so reading the
			// collection again can provide consistency to the reactive graph again as the deriveds
			// will now be `CLEAN`.
			get(each_array);
		});

		/** @type {EachState} */
		var state = { effect, items, pending, outrogroups: null, fallback };

		first_run = false;
	}

	/**
	 * Skip past any non-branch effects (which could be created with `createSubscriber`, for example) to find the next branch effect
	 * @param {Effect | null} effect
	 * @returns {Effect | null}
	 */
	function skip_to_branch(effect) {
		while (effect !== null && (effect.f & BRANCH_EFFECT) === 0) {
			effect = effect.next;
		}
		return effect;
	}

	/**
	 * Add, remove, or reorder items output by an each block as its input changes
	 * @template V
	 * @param {EachState} state
	 * @param {Array<V>} array
	 * @param {Element | Comment | Text} anchor
	 * @param {number} flags
	 * @param {(value: V, index: number) => any} get_key
	 * @returns {void}
	 */
	function reconcile(state, array, anchor, flags, get_key) {
		var is_animated = (flags & EACH_IS_ANIMATED) !== 0;

		var length = array.length;
		var items = state.items;
		var current = skip_to_branch(state.effect.first);

		/** @type {undefined | Set<Effect>} */
		var seen;

		/** @type {Effect | null} */
		var prev = null;

		/** @type {undefined | Set<Effect>} */
		var to_animate;

		/** @type {Effect[]} */
		var matched = [];

		/** @type {Effect[]} */
		var stashed = [];

		/** @type {V} */
		var value;

		/** @type {any} */
		var key;

		/** @type {Effect | undefined} */
		var effect;

		/** @type {number} */
		var i;

		if (is_animated) {
			for (i = 0; i < length; i += 1) {
				value = array[i];
				key = get_key(value, i);
				effect = /** @type {EachItem} */ (items.get(key)).e;

				// offscreen == coming in now, no animation in that case,
				// else this would happen https://github.com/sveltejs/svelte/issues/17181
				if ((effect.f & EFFECT_OFFSCREEN) === 0) {
					effect.nodes?.a?.measure();
					(to_animate ??= new Set()).add(effect);
				}
			}
		}

		for (i = 0; i < length; i += 1) {
			value = array[i];
			key = get_key(value, i);

			effect = /** @type {EachItem} */ (items.get(key)).e;

			if (state.outrogroups !== null) {
				for (const group of state.outrogroups) {
					group.pending.delete(effect);
					group.done.delete(effect);
				}
			}

			if ((effect.f & INERT) !== 0) {
				resume_effect(effect);
				if (is_animated) {
					effect.nodes?.a?.unfix();
					(to_animate ??= new Set()).delete(effect);
				}
			}

			if ((effect.f & EFFECT_OFFSCREEN) !== 0) {
				effect.f ^= EFFECT_OFFSCREEN;

				if (effect === current) {
					move(effect, null, anchor);
				} else {
					var next = prev ? prev.next : current;

					if (effect === state.effect.last) {
						state.effect.last = effect.prev;
					}

					if (effect.prev) effect.prev.next = effect.next;
					if (effect.next) effect.next.prev = effect.prev;
					link(state, prev, effect);
					link(state, effect, next);

					move(effect, next, anchor);
					prev = effect;

					matched = [];
					stashed = [];

					current = skip_to_branch(prev.next);
					continue;
				}
			}

			if (effect !== current) {
				if (seen !== undefined && seen.has(effect)) {
					if (matched.length < stashed.length) {
						// more efficient to move later items to the front
						var start = stashed[0];
						var j;

						prev = start.prev;

						var a = matched[0];
						var b = matched[matched.length - 1];

						for (j = 0; j < matched.length; j += 1) {
							move(matched[j], start, anchor);
						}

						for (j = 0; j < stashed.length; j += 1) {
							seen.delete(stashed[j]);
						}

						link(state, a.prev, b.next);
						link(state, prev, a);
						link(state, b, start);

						current = start;
						prev = b;
						i -= 1;

						matched = [];
						stashed = [];
					} else {
						// more efficient to move earlier items to the back
						seen.delete(effect);
						move(effect, current, anchor);

						link(state, effect.prev, effect.next);
						link(state, effect, prev === null ? state.effect.first : prev.next);
						link(state, prev, effect);

						prev = effect;
					}

					continue;
				}

				matched = [];
				stashed = [];

				while (current !== null && current !== effect) {
					(seen ??= new Set()).add(current);
					stashed.push(current);
					current = skip_to_branch(current.next);
				}

				if (current === null) {
					continue;
				}
			}

			if ((effect.f & EFFECT_OFFSCREEN) === 0) {
				matched.push(effect);
			}

			prev = effect;
			current = skip_to_branch(effect.next);
		}

		if (state.outrogroups !== null) {
			for (const group of state.outrogroups) {
				if (group.pending.size === 0) {
					destroy_effects(state, array_from(group.done));
					state.outrogroups?.delete(group);
				}
			}

			if (state.outrogroups.size === 0) {
				state.outrogroups = null;
			}
		}

		if (current !== null || seen !== undefined) {
			/** @type {Effect[]} */
			var to_destroy = [];

			if (seen !== undefined) {
				for (effect of seen) {
					if ((effect.f & INERT) === 0) {
						to_destroy.push(effect);
					}
				}
			}

			while (current !== null) {
				// If the each block isn't inert, then inert effects are currently outroing and will be removed once the transition is finished
				if ((current.f & INERT) === 0 && current !== state.fallback) {
					to_destroy.push(current);
				}

				current = skip_to_branch(current.next);
			}

			var destroy_length = to_destroy.length;

			if (destroy_length > 0) {
				var controlled_anchor = (flags & EACH_IS_CONTROLLED) !== 0 && length === 0 ? anchor : null;

				if (is_animated) {
					for (i = 0; i < destroy_length; i += 1) {
						to_destroy[i].nodes?.a?.measure();
					}

					for (i = 0; i < destroy_length; i += 1) {
						to_destroy[i].nodes?.a?.fix();
					}
				}

				pause_effects(state, to_destroy, controlled_anchor);
			}
		}

		if (is_animated) {
			queue_micro_task(() => {
				if (to_animate === undefined) return;
				for (effect of to_animate) {
					effect.nodes?.a?.apply();
				}
			});
		}
	}

	/**
	 * @template V
	 * @param {Map<any, EachItem>} items
	 * @param {Node} anchor
	 * @param {V} value
	 * @param {unknown} key
	 * @param {number} index
	 * @param {(anchor: Node, item: V | Source<V>, index: number | Value<number>, collection: () => V[]) => void} render_fn
	 * @param {number} flags
	 * @param {() => V[]} get_collection
	 * @returns {EachItem}
	 */
	function create_item(items, anchor, value, key, index, render_fn, flags, get_collection) {
		var v =
			(flags & EACH_ITEM_REACTIVE) !== 0
				? (flags & EACH_ITEM_IMMUTABLE) === 0
					? mutable_source(value, false, false)
					: source(value)
				: null;

		var i = (flags & EACH_INDEX_REACTIVE) !== 0 ? source(index) : null;

		return {
			v,
			i,
			e: branch(() => {
				render_fn(anchor, v ?? value, i ?? index, get_collection);

				return () => {
					items.delete(key);
				};
			})
		};
	}

	/**
	 * @param {Effect} effect
	 * @param {Effect | null} next
	 * @param {Text | Element | Comment} anchor
	 */
	function move(effect, next, anchor) {
		if (!effect.nodes) return;

		var node = effect.nodes.start;
		var end = effect.nodes.end;

		var dest =
			next && (next.f & EFFECT_OFFSCREEN) === 0
				? /** @type {EffectNodes} */ (next.nodes).start
				: anchor;

		while (node !== null) {
			var next_node = /** @type {TemplateNode} */ (get_next_sibling(node));
			dest.before(node);

			if (node === end) {
				return;
			}

			node = next_node;
		}
	}

	/**
	 * @param {EachState} state
	 * @param {Effect | null} prev
	 * @param {Effect | null} next
	 */
	function link(state, prev, next) {
		if (prev === null) {
			state.effect.first = next;
		} else {
			prev.next = next;
		}

		if (next === null) {
			state.effect.last = prev;
		} else {
			next.prev = prev;
		}
	}

	/** @import { Effect, TemplateNode } from '#client' */
	/** @import {} from 'trusted-types' */

	/**
	 * @param {Element | Text | Comment} node
	 * @param {() => string | TrustedHTML} get_value
	 * @param {boolean} [is_controlled]
	 * @param {boolean} [svg]
	 * @param {boolean} [mathml]
	 * @param {boolean} [skip_warning]
	 * @returns {void}
	 */
	function html(
		node,
		get_value,
		is_controlled = false,
		svg = false,
		mathml = false,
		skip_warning = false
	) {
		var anchor = node;

		/** @type {string | TrustedHTML} */
		var value = '';

		if (is_controlled) {
			var parent_node = /** @type {Element} */ (node);
		}

		template_effect(() => {
			var effect = /** @type {Effect} */ (active_effect);

			if (value === (value = get_value() ?? '')) {
				return;
			}

			if (is_controlled && true) {
				// When @html is the only child, use innerHTML directly.
				// This also handles contenteditable, where the user may delete the anchor comment.
				effect.nodes = null;
				parent_node.innerHTML = /** @type {string} */ (value);

				if (value !== '') {
					assign_nodes(
						/** @type {TemplateNode} */ (get_first_child(parent_node)),
						/** @type {TemplateNode} */ (parent_node.lastChild)
					);
				}

				return;
			}

			if (effect.nodes !== null) {
				remove_effect_dom(effect.nodes.start, /** @type {TemplateNode} */ (effect.nodes.end));
				effect.nodes = null;
			}

			if (value === '') return;

			// Don't use create_fragment_with_script_from_html here because that would mean script tags are executed.
			// @html is basically `.innerHTML = ...` and that doesn't execute scripts either due to security reasons.
			// Use a <template>, <svg>, or <math> wrapper depending on context. If value is a TrustedHTML object,
			// it will be assigned directly to innerHTML without coercion — this allows {@html policy.createHTML(...)} to work.
			var ns = svg ? NAMESPACE_SVG : mathml ? NAMESPACE_MATHML : undefined;
			var wrapper = /** @type {HTMLTemplateElement | SVGElement | MathMLElement} */ (
				create_element(svg ? 'svg' : mathml ? 'math' : 'template', ns)
			);
			wrapper.innerHTML = /** @type {any} */ (value);

			/** @type {DocumentFragment | Element} */
			var node = svg || mathml ? wrapper : /** @type {HTMLTemplateElement} */ (wrapper).content;

			assign_nodes(
				/** @type {TemplateNode} */ (get_first_child(node)),
				/** @type {TemplateNode} */ (node.lastChild)
			);

			if (svg || mathml) {
				while (get_first_child(node)) {
					anchor.before(/** @type {TemplateNode} */ (get_first_child(node)));
				}
			} else {
				anchor.before(node);
			}
		});
	}

	/** @import { TemplateNode, Dom } from '#client' */

	/**
	 * @template P
	 * @template {(props: P) => void} C
	 * @param {TemplateNode} node
	 * @param {() => C} get_component
	 * @param {(anchor: TemplateNode, component: C) => Dom | void} render_fn
	 * @returns {void}
	 */
	function component(node, get_component, render_fn) {

		var branches = new BranchManager(node);

		block(() => {
			var component = get_component() ?? null;

			branches.ensure(component, component && ((target) => render_fn(target, component)));
		}, EFFECT_TRANSPARENT);
	}

	/** @import { Raf } from '#client' */

	const now = () => performance.now() ;

	/** @type {Raf} */
	const raf = {
		// don't access requestAnimationFrame eagerly outside method
		// this allows basic testing of user code without JSDOM
		// bunder will eval and remove ternary when the user's app is built
		tick: /** @param {any} _ */ (_) => (requestAnimationFrame )(_),
		now: () => now(),
		tasks: new Set()
	};

	/** @import { TaskCallback, Task, TaskEntry } from '#client' */

	// TODO move this into timing.js where it probably belongs

	/**
	 * @returns {void}
	 */
	function run_tasks() {
		// use `raf.now()` instead of the `requestAnimationFrame` callback argument, because
		// otherwise things can get wonky https://github.com/sveltejs/svelte/pull/14541
		const now = raf.now();

		raf.tasks.forEach((task) => {
			if (!task.c(now)) {
				raf.tasks.delete(task);
				task.f();
			}
		});

		if (raf.tasks.size !== 0) {
			raf.tick(run_tasks);
		}
	}

	/**
	 * Creates a new task that runs on each raf frame
	 * until it returns a falsy value or is aborted
	 * @param {TaskCallback} callback
	 * @returns {Task}
	 */
	function loop(callback) {
		/** @type {TaskEntry} */
		let task;

		if (raf.tasks.size === 0) {
			raf.tick(run_tasks);
		}

		return {
			promise: new Promise((fulfill) => {
				raf.tasks.add((task = { c: callback, f: fulfill }));
			}),
			abort() {
				raf.tasks.delete(task);
			}
		};
	}

	/** @import { AnimateFn, Animation, AnimationConfig, EachItem, Effect, EffectNodes, TransitionFn, TransitionManager } from '#client' */

	/**
	 * @param {Element} element
	 * @param {'introstart' | 'introend' | 'outrostart' | 'outroend'} type
	 * @returns {void}
	 */
	function dispatch_event(element, type) {
		without_reactive_context(() => {
			element.dispatchEvent(new CustomEvent(type));
		});
	}

	/**
	 * Converts a property to the camel-case format expected by Element.animate(), KeyframeEffect(), and KeyframeEffect.setKeyframes().
	 * @param {string} style
	 * @returns {string}
	 */
	function css_property_to_camelcase(style) {
		// in compliance with spec
		if (style === 'float') return 'cssFloat';
		if (style === 'offset') return 'cssOffset';

		// do not rename custom @properties
		if (style.startsWith('--')) return style;

		const parts = style.split('-');
		if (parts.length === 1) return parts[0];
		return (
			parts[0] +
			parts
				.slice(1)
				.map(/** @param {any} word */ (word) => word[0].toUpperCase() + word.slice(1))
				.join('')
		);
	}

	/**
	 * @param {string} css
	 * @returns {Keyframe}
	 */
	function css_to_keyframe(css) {
		/** @type {Keyframe} */
		const keyframe = {};
		const parts = css.split(';');
		for (const part of parts) {
			const [property, value] = part.split(':');
			if (!property || value === undefined) break;

			const formatted_property = css_property_to_camelcase(property.trim());
			keyframe[formatted_property] = value.trim();
		}
		return keyframe;
	}

	/** @param {number} t */
	const linear$2 = (t) => t;

	/**
	 * Called inside keyed `{#each ...}` blocks (as `$.animation(...)`). This creates an animation manager
	 * and attaches it to the block, so that moves can be animated following reconciliation.
	 * @template P
	 * @param {Element} element
	 * @param {() => AnimateFn<P | undefined>} get_fn
	 * @param {(() => P) | null} get_params
	 */
	function animation(element, get_fn, get_params) {
		var effect = /** @type {Effect} */ (active_effect);
		var nodes = /** @type {EffectNodes} */ (effect.nodes);

		/** @type {DOMRect} */
		var from;

		/** @type {DOMRect} */
		var to;

		/** @type {Animation | undefined} */
		var animation;

		/** @type {null | { position: string, width: string, height: string, transform: string }} */
		var original_styles = null;

		nodes.a ??= {
			element,
			measure() {
				from = this.element.getBoundingClientRect();
			},
			apply() {
				animation?.abort();

				to = this.element.getBoundingClientRect();

				if (
					from.left !== to.left ||
					from.right !== to.right ||
					from.top !== to.top ||
					from.bottom !== to.bottom
				) {
					const options = get_fn()(this.element, { from, to }, get_params?.());

					animation = animate(this.element, options, undefined, 1, () => {
						animation?.abort();
						animation = undefined;
					});
				}
			},
			fix() {
				// If an animation is already running, transforming the element is likely to fail,
				// because the styles applied by the animation take precedence. In the case of crossfade,
				// that means the `translate(...)` of the crossfade transition overrules the `translate(...)`
				// we would apply below, leading to the element jumping somewhere to the top left.
				if (element.getAnimations().length) return;

				// It's important to destructure these to get fixed values - the object itself has getters,
				// and changing the style to 'absolute' can for example influence the width.
				var { position, width, height } = getComputedStyle(element);

				if (position !== 'absolute' && position !== 'fixed') {
					var style = /** @type {HTMLElement | SVGElement} */ (element).style;

					original_styles = {
						position: style.position,
						width: style.width,
						height: style.height,
						transform: style.transform
					};

					style.position = 'absolute';
					style.width = width;
					style.height = height;
					var to = element.getBoundingClientRect();

					if (from.left !== to.left || from.top !== to.top) {
						var transform = `translate(${from.left - to.left}px, ${from.top - to.top}px)`;
						style.transform = style.transform ? `${style.transform} ${transform}` : transform;
					}
				}
			},
			unfix() {
				if (original_styles) {
					var style = /** @type {HTMLElement | SVGElement} */ (element).style;

					style.position = original_styles.position;
					style.width = original_styles.width;
					style.height = original_styles.height;
					style.transform = original_styles.transform;
				}
			}
		};

		// in the case of a `<svelte:element>`, it's possible for `$.animation(...)` to be called
		// when an animation manager already exists, if the tag changes. in that case, we need to
		// swap out the element rather than creating a new manager, in case it happened at the same
		// moment as a reconciliation
		nodes.a.element = element;
	}

	/**
	 * Called inside block effects as `$.transition(...)`. This creates a transition manager and
	 * attaches it to the current effect — later, inside `pause_effect` and `resume_effect`, we
	 * use this to create `intro` and `outro` transitions.
	 * @template P
	 * @param {number} flags
	 * @param {HTMLElement} element
	 * @param {() => TransitionFn<P | undefined>} get_fn
	 * @param {(() => P) | null} get_params
	 * @returns {void}
	 */
	function transition(flags, element, get_fn, get_params) {
		var is_intro = (flags & TRANSITION_IN) !== 0;
		var is_outro = (flags & TRANSITION_OUT) !== 0;
		var is_both = is_intro && is_outro;
		var is_global = (flags & TRANSITION_GLOBAL) !== 0;

		/** @type {'in' | 'out' | 'both'} */
		var direction = is_both ? 'both' : is_intro ? 'in' : 'out';

		/** @type {AnimationConfig | ((opts: { direction: 'in' | 'out' }) => AnimationConfig) | undefined} */
		var current_options;

		var inert = element.inert;

		/**
		 * The default overflow style, stashed so we can revert changes during the transition
		 * that are necessary to work around a Safari <18 bug
		 * TODO 6.0 remove this, if older versions of Safari have died out enough
		 */
		var overflow = element.style.overflow;

		/** @type {Animation | undefined} */
		var intro;

		/** @type {Animation | undefined} */
		var outro;

		function get_options() {
			return without_reactive_context(() => {
				// If a transition is still ongoing, we use the existing options rather than generating
				// new ones. This ensures that reversible transitions reverse smoothly, rather than
				// jumping to a new spot because (for example) a different `duration` was used
				return (current_options ??= get_fn()(element, get_params?.() ?? /** @type {P} */ ({}), {
					direction
				}));
			});
		}

		/** @type {TransitionManager} */
		var transition = {
			is_global,
			in() {
				element.inert = inert;

				if (!is_intro) {
					outro?.abort();
					outro?.reset?.();
					return;
				}

				if (!is_outro) {
					// if we intro then outro then intro again, we want to abort the first intro,
					// if it's not a bidirectional transition
					intro?.abort();
				}

				intro = animate(element, get_options(), outro, 1, () => {
					dispatch_event(element, 'introend');

					// Ensure we cancel the animation to prevent leaking
					intro?.abort();
					intro = current_options = undefined;

					element.style.overflow = overflow;
				});
			},
			out(fn) {
				if (!is_outro) {
					fn?.();
					current_options = undefined;
					return;
				}

				element.inert = true;

				outro = animate(element, get_options(), intro, 0, () => {
					dispatch_event(element, 'outroend');
					fn?.();
				});
			},
			stop: () => {
				intro?.abort();
				outro?.abort();
			}
		};

		var e = /** @type {Effect & { nodes: EffectNodes }} */ (active_effect);

		(e.nodes.t ??= []).push(transition);

		// if this is a local transition, we only want to run it if the parent (branch) effect's
		// parent (block) effect is where the state change happened. we can determine that by
		// looking at whether the block effect is currently initializing
		if (is_intro && should_intro) {
			var run = is_global;

			if (!run) {
				var block = /** @type {Effect | null} */ (e.parent);

				// skip over transparent blocks (e.g. snippets, else-if blocks)
				while (block && (block.f & EFFECT_TRANSPARENT) !== 0) {
					while ((block = block.parent)) {
						if ((block.f & BLOCK_EFFECT) !== 0) break;
					}
				}

				run = !block || (block.f & REACTION_RAN) !== 0;
			}

			if (run) {
				effect(() => {
					untrack(() => transition.in());
				});
			}
		}
	}

	/**
	 * Animates an element, according to the provided configuration
	 * @param {Element} element
	 * @param {AnimationConfig | ((opts: { direction: 'in' | 'out' }) => AnimationConfig)} options
	 * @param {Animation | undefined} counterpart The corresponding intro/outro to this outro/intro
	 * @param {number} t2 The target `t` value — `1` for intro, `0` for outro
	 * @param {(() => void)} on_finish Called after successfully completing the animation
	 * @returns {Animation}
	 */
	function animate(element, options, counterpart, t2, on_finish) {
		var is_intro = t2 === 1;

		if (is_function(options)) {
			// In the case of a deferred transition (such as `crossfade`), `option` will be
			// a function rather than an `AnimationConfig`. We need to call this function
			// once the DOM has been updated...
			/** @type {Animation} */
			var a;
			var aborted = false;

			queue_micro_task(() => {
				if (aborted) return;
				var o = options({ direction: is_intro ? 'in' : 'out' });
				a = animate(element, o, counterpart, t2, on_finish);
			});

			// ...but we want to do so without using `async`/`await` everywhere, so
			// we return a facade that allows everything to remain synchronous
			return {
				abort: () => {
					aborted = true;
					a?.abort();
				},
				deactivate: () => a.deactivate(),
				reset: () => a.reset(),
				t: () => a.t()
			};
		}

		counterpart?.deactivate();

		if (!options?.duration && !options?.delay) {
			dispatch_event(element, is_intro ? 'introstart' : 'outrostart');
			on_finish();

			return {
				abort: noop,
				deactivate: noop,
				reset: noop,
				t: () => t2
			};
		}

		const { delay = 0, css, tick, easing = linear$2 } = options;

		var keyframes = [];

		if (is_intro && counterpart === undefined) {
			if (tick) {
				tick(0, 1); // TODO put in nested effect, to avoid interleaved reads/writes?
			}

			if (css) {
				var styles = css_to_keyframe(css(0, 1));
				keyframes.push(styles, styles);
			}
		}

		var get_t = () => 1 - t2;

		// create a dummy animation that lasts as long as the delay (but with whatever devtools
		// multiplier is in effect). in the common case that it is `0`, we keep it anyway so that
		// the CSS keyframes aren't created until the DOM is updated
		//
		// fill forwards to prevent the element from rendering without styles applied
		// see https://github.com/sveltejs/svelte/issues/14732
		var animation = element.animate(keyframes, { duration: delay, fill: 'forwards' });

		animation.onfinish = () => {
			// remove dummy animation from the stack to prevent conflict with main animation
			animation.cancel();

			dispatch_event(element, is_intro ? 'introstart' : 'outrostart');

			// for bidirectional transitions, we start from the current position,
			// rather than doing a full intro/outro
			var t1 = counterpart?.t() ?? 1 - t2;
			counterpart?.abort();

			var delta = t2 - t1;
			var duration = /** @type {number} */ (options.duration) * Math.abs(delta);
			var keyframes = [];

			if (duration > 0) {
				/**
				 * Whether or not the CSS includes `overflow: hidden`, in which case we need to
				 * add it as an inline style to work around a Safari <18 bug
				 * TODO 6.0 remove this, if possible
				 */
				var needs_overflow_hidden = false;

				if (css) {
					var n = Math.ceil(duration / (1000 / 60)); // `n` must be an integer, or we risk missing the `t2` value

					for (var i = 0; i <= n; i += 1) {
						var t = t1 + delta * easing(i / n);
						var styles = css_to_keyframe(css(t, 1 - t));
						keyframes.push(styles);

						needs_overflow_hidden ||= styles.overflow === 'hidden';
					}
				}

				if (needs_overflow_hidden) {
					/** @type {HTMLElement} */ (element).style.overflow = 'hidden';
				}

				get_t = () => {
					var time = /** @type {number} */ (
						/** @type {globalThis.Animation} */ (animation).currentTime
					);

					return t1 + delta * easing(time / duration);
				};

				if (tick) {
					loop(() => {
						if (animation.playState !== 'running') return false;

						var t = get_t();
						tick(t, 1 - t);

						return true;
					});
				}
			}

			animation = element.animate(keyframes, { duration, fill: 'forwards' });

			animation.onfinish = () => {
				get_t = () => t2;
				tick?.(t2, 1 - t2);
				on_finish();
			};
		};

		return {
			abort: () => {
				if (animation) {
					animation.cancel();
					// This prevents memory leaks in Chromium
					animation.effect = null;
					// This prevents onfinish to be launched after cancel(),
					// which can happen in some rare cases
					// see https://github.com/sveltejs/svelte/issues/13681
					animation.onfinish = noop;
				}
			},
			deactivate: () => {
				on_finish = noop;
			},
			reset: () => {
				if (t2 === 0) {
					tick?.(1, 0);
				}
			},
			t: () => get_t()
		};
	}

	/** @import { ActionPayload } from '#client' */

	/**
	 * @template P
	 * @param {Element} dom
	 * @param {(dom: Element, value?: P) => ActionPayload<P>} action
	 * @param {() => P} [get_value]
	 * @returns {void}
	 */
	function action(dom, action, get_value) {
		effect(() => {
			var payload = untrack(() => action(dom, get_value?.()) || {});

			if (payload?.destroy) {
				return () => /** @type {Function} */ (payload.destroy)();
			}
		});
	}

	function r(e){var t,f,n="";if("string"==typeof e||"number"==typeof e)n+=e;else if("object"==typeof e)if(Array.isArray(e)){var o=e.length;for(t=0;t<o;t++)e[t]&&(f=r(e[t]))&&(n&&(n+=" "),n+=f);}else for(f in e)e[f]&&(n&&(n+=" "),n+=f);return n}function clsx$1(){for(var e,t,f=0,n="",o=arguments.length;f<o;f++)(e=arguments[f])&&(t=r(e))&&(n&&(n+=" "),n+=t);return n}

	/**
	 * Small wrapper around clsx to preserve Svelte's (weird) handling of falsy values.
	 * TODO Svelte 6 revisit this, and likely turn all falsy values into the empty string (what clsx also does)
	 * @param  {any} value
	 */
	function clsx(value) {
		if (typeof value === 'object') {
			return clsx$1(value);
		} else {
			return value ?? '';
		}
	}

	const whitespace = [...' \t\n\r\f\u00a0\u000b\ufeff'];

	/**
	 * @param {any} value
	 * @param {string | null} [hash]
	 * @param {Record<string, boolean>} [directives]
	 * @returns {string | null}
	 */
	function to_class(value, hash, directives) {
		var classname = value == null ? '' : '' + value;

		if (hash) {
			classname = classname ? classname + ' ' + hash : hash;
		}

		if (directives) {
			for (var key of Object.keys(directives)) {
				if (directives[key]) {
					classname = classname ? classname + ' ' + key : key;
				} else if (classname.length) {
					var len = key.length;
					var a = 0;

					while ((a = classname.indexOf(key, a)) >= 0) {
						var b = a + len;

						if (
							(a === 0 || whitespace.includes(classname[a - 1])) &&
							(b === classname.length || whitespace.includes(classname[b]))
						) {
							classname = (a === 0 ? '' : classname.substring(0, a)) + classname.substring(b + 1);
						} else {
							a = b;
						}
					}
				}
			}
		}

		return classname === '' ? null : classname;
	}

	/**
	 * @param {any} value
	 * @param {Record<string, any> | [Record<string, any>, Record<string, any>]} [styles]
	 * @returns {string | null}
	 */
	function to_style(value, styles) {

		return value == null ? null : String(value);
	}

	/**
	 * @param {Element} dom
	 * @param {boolean | number} is_html
	 * @param {string | null} value
	 * @param {string} [hash]
	 * @param {Record<string, any>} [prev_classes]
	 * @param {Record<string, any>} [next_classes]
	 * @returns {Record<string, boolean> | undefined}
	 */
	function set_class(dom, is_html, value, hash, prev_classes, next_classes) {
		// @ts-expect-error need to add __className to patched prototype
		var prev = dom.__className;

		if (
			prev !== value ||
			prev === undefined // for edge case of `class={undefined}`
		) {
			var next_class_name = to_class(value, hash, next_classes);

			{
				// Removing the attribute when the value is only an empty string causes
				// performance issues vs simply making the className an empty string. So
				// we should only remove the class if the value is nullish
				// and there no hash/directives :
				if (next_class_name == null) {
					dom.removeAttribute('class');
				} else {
					dom.className = next_class_name;
				}
			}

			// @ts-expect-error need to add __className to patched prototype
			dom.__className = value;
		} else if (next_classes && prev_classes !== next_classes) {
			for (var key in next_classes) {
				var is_present = !!next_classes[key];

				if (prev_classes == null || is_present !== !!prev_classes[key]) {
					dom.classList.toggle(key, is_present);
				}
			}
		}

		return next_classes;
	}

	/**
	 * @param {Element & ElementCSSInlineStyle} dom
	 * @param {string | null} value
	 * @param {Record<string, any> | [Record<string, any>, Record<string, any>]} [prev_styles]
	 * @param {Record<string, any> | [Record<string, any>, Record<string, any>]} [next_styles]
	 */
	function set_style(dom, value, prev_styles, next_styles) {
		// @ts-expect-error
		var prev = dom.__style;

		if (prev !== value) {
			var next_style_attr = to_style(value);

			{
				if (next_style_attr == null) {
					dom.removeAttribute('style');
				} else {
					dom.style.cssText = next_style_attr;
				}
			}

			// @ts-expect-error
			dom.__style = value;
		}

		return next_styles;
	}

	/** @import { Blocker, Effect } from '#client' */

	const IS_CUSTOM_ELEMENT = Symbol('is custom element');
	const IS_HTML = Symbol('is html');
	const PROGRESS_TAG = IS_XHTML ? 'progress' : 'PROGRESS';

	/**
	 * @param {Element} element
	 * @param {any} value
	 */
	function set_value(element, value) {
		var attributes = get_attributes(element);

		if (
			attributes.value ===
				(attributes.value =
					// treat null and undefined the same for the initial value
					value ?? undefined) ||
			// @ts-expect-error
			// `progress` elements always need their value set when it's `0`
			(element.value === value && (value !== 0 || element.nodeName !== PROGRESS_TAG))
		) {
			return;
		}

		// @ts-expect-error
		element.value = value ?? '';
	}

	/**
	 * @param {Element} element
	 * @param {string} attribute
	 * @param {string | null} value
	 * @param {boolean} [skip_warning]
	 */
	function set_attribute(element, attribute, value, skip_warning) {
		var attributes = get_attributes(element);

		if (attributes[attribute] === (attributes[attribute] = value)) return;

		if (value == null) {
			element.removeAttribute(attribute);
		} else if (typeof value !== 'string' && get_setters(element).includes(attribute)) {
			// @ts-ignore
			element[attribute] = value;
		} else {
			element.setAttribute(attribute, value);
		}
	}

	/**
	 *
	 * @param {Element} element
	 */
	function get_attributes(element) {
		return /** @type {Record<string | symbol, unknown>} **/ (
			// @ts-expect-error
			element.__attributes ??= {
				[IS_CUSTOM_ELEMENT]: element.nodeName.includes('-'),
				[IS_HTML]: element.namespaceURI === NAMESPACE_HTML
			}
		);
	}

	/** @type {Map<string, string[]>} */
	var setters_cache = new Map();

	/** @param {Element} element */
	function get_setters(element) {
		var cache_key = element.getAttribute('is') || element.nodeName;
		var setters = setters_cache.get(cache_key);
		if (setters) return setters;
		setters_cache.set(cache_key, (setters = []));

		var descriptors;
		var proto = element; // In the case of custom elements there might be setters on the instance
		var element_proto = Element.prototype;

		// Stop at Element, from there on there's only unnecessary setters we're not interested in
		// Do not use contructor.name here as that's unreliable in some browser environments
		while (element_proto !== proto) {
			descriptors = get_descriptors(proto);

			for (var key in descriptors) {
				if (descriptors[key].set) {
					setters.push(key);
				}
			}

			proto = get_prototype_of(proto);
		}

		return setters;
	}

	/** @import { Batch } from '../../../reactivity/batch.js' */

	/**
	 * @param {HTMLInputElement} input
	 * @param {() => unknown} get
	 * @param {(value: unknown) => void} set
	 * @returns {void}
	 */
	function bind_value(input, get, set = get) {
		var batches = new WeakSet();

		listen_to_event_and_reset_event(input, 'input', async (is_reset) => {

			/** @type {any} */
			var value = is_reset ? input.defaultValue : input.value;
			value = is_numberlike_input(input) ? to_number(value) : value;
			set(value);

			if (current_batch !== null) {
				batches.add(current_batch);
			}

			// Because `{#each ...}` blocks work by updating sources inside the flush,
			// we need to wait a tick before checking to see if we should forcibly
			// update the input and reset the selection state
			await tick();

			// Respect any validation in accessors
			if (value !== (value = get())) {
				var start = input.selectionStart;
				var end = input.selectionEnd;
				var length = input.value.length;

				// the value is coerced on assignment
				input.value = value ?? '';

				// Restore selection
				if (end !== null) {
					var new_length = input.value.length;
					// If cursor was at end and new input is longer, move cursor to new end
					if (start === end && end === length && new_length > length) {
						input.selectionStart = new_length;
						input.selectionEnd = new_length;
					} else {
						input.selectionStart = start;
						input.selectionEnd = Math.min(end, new_length);
					}
				}
			}
		});

		if (
			// If we are hydrating and the value has since changed,
			// then use the updated value from the input instead.
			// If defaultValue is set, then value == defaultValue
			// TODO Svelte 6: remove input.value check and set to empty string?
			(untrack(get) == null && input.value)
		) {
			set(is_numberlike_input(input) ? to_number(input.value) : input.value);

			if (current_batch !== null) {
				batches.add(current_batch);
			}
		}

		render_effect(() => {

			var value = get();

			if (input === document.activeElement) {
				// In sync mode render effects are executed during tree traversal -> needs current_batch
				// In async mode render effects are flushed once batch resolved, at which point current_batch is null -> needs previous_batch
				var batch = /** @type {Batch} */ (current_batch);

				// Never rewrite the contents of a focused input. We can get here if, for example,
				// an update is deferred because of async work depending on the input:
				//
				// <input bind:value={query}>
				// <p>{await find(query)}</p>
				if (batches.has(batch)) {
					return;
				}
			}

			if (is_numberlike_input(input) && value === to_number(input.value)) {
				// handles 0 vs 00 case (see https://github.com/sveltejs/svelte/issues/9959)
				return;
			}

			if (input.type === 'date' && !value && !input.value) {
				// Handles the case where a temporarily invalid date is set (while typing, for example with a leading 0 for the day)
				// and prevents this state from clearing the other parts of the date input (see https://github.com/sveltejs/svelte/issues/7897)
				return;
			}

			// don't set the value of the input if it's the same to allow
			// minlength to work properly
			if (value !== input.value) {
				// @ts-expect-error the value is coerced on assignment
				input.value = value ?? '';
			}
		});
	}

	/**
	 * @param {HTMLInputElement} input
	 */
	function is_numberlike_input(input) {
		var type = input.type;
		return type === 'number' || type === 'range';
	}

	/**
	 * @param {string} value
	 */
	function to_number(value) {
		return value === '' ? null : +value;
	}

	/**
	 * Substitute for the `preventDefault` event modifier
	 * @deprecated
	 * @param {(event: Event, ...args: Array<unknown>) => void} fn
	 * @returns {(event: Event, ...args: unknown[]) => void}
	 */
	function preventDefault(fn) {
		return function (...args) {
			var event = /** @type {Event} */ (args[0]);
			event.preventDefault();
			// @ts-ignore
			return fn?.apply(this, args);
		};
	}

	/** @import { ComponentContextLegacy } from '#client' */

	/**
	 * Legacy-mode only: Call `onMount` callbacks and set up `beforeUpdate`/`afterUpdate` effects
	 * @param {boolean} [immutable]
	 */
	function init(immutable = false) {
		const context = /** @type {ComponentContextLegacy} */ (component_context);

		const callbacks = context.l.u;
		if (!callbacks) return;

		let props = () => deep_read_state(context.s);

		if (immutable) {
			let version = 0;
			let prev = /** @type {Record<string, any>} */ ({});

			// In legacy immutable mode, before/afterUpdate only fire if the object identity of a prop changes
			const d = derived(() => {
				let changed = false;
				const props = context.s;
				for (const key in props) {
					if (props[key] !== prev[key]) {
						prev[key] = props[key];
						changed = true;
					}
				}
				if (changed) version++;
				return version;
			});

			props = () => get(d);
		}

		// beforeUpdate
		if (callbacks.b.length) {
			user_pre_effect(() => {
				observe_all(context, props);
				run_all(callbacks.b);
			});
		}

		// onMount (must run before afterUpdate)
		user_effect(() => {
			const fns = untrack(() => callbacks.m.map(run));
			return () => {
				for (const fn of fns) {
					if (typeof fn === 'function') {
						fn();
					}
				}
			};
		});

		// afterUpdate
		if (callbacks.a.length) {
			user_effect(() => {
				observe_all(context, props);
				run_all(callbacks.a);
			});
		}
	}

	/**
	 * Invoke the getter of all signals associated with a component
	 * so they can be registered to the effect this function is called in.
	 * @param {ComponentContextLegacy} context
	 * @param {(() => void)} props
	 */
	function observe_all(context, props) {
		if (context.l.s) {
			for (const signal of context.l.s) get(signal);
		}

		props();
	}

	/** @import { Effect, Source } from './types.js' */

	/**
	 * The proxy handler for spread props. Handles the incoming array of props
	 * that looks like `() => { dynamic: props }, { static: prop }, ..` and wraps
	 * them so that the whole thing is passed to the component as the `$$props` argument.
	 * @type {ProxyHandler<{ props: Array<Record<string | symbol, unknown> | (() => Record<string | symbol, unknown>)> }>}}
	 */
	const spread_props_handler = {
		get(target, key) {
			let i = target.props.length;
			while (i--) {
				let p = target.props[i];
				if (is_function(p)) p = p();
				if (typeof p === 'object' && p !== null && key in p) return p[key];
			}
		},
		set(target, key, value) {
			let i = target.props.length;
			while (i--) {
				let p = target.props[i];
				if (is_function(p)) p = p();
				const desc = get_descriptor(p, key);
				if (desc && desc.set) {
					desc.set(value);
					return true;
				}
			}
			return false;
		},
		getOwnPropertyDescriptor(target, key) {
			let i = target.props.length;
			while (i--) {
				let p = target.props[i];
				if (is_function(p)) p = p();
				if (typeof p === 'object' && p !== null && key in p) {
					const descriptor = get_descriptor(p, key);
					if (descriptor && !descriptor.configurable) {
						// Prevent a "Non-configurability Report Error": The target is an array, it does
						// not actually contain this property. If it is now described as non-configurable,
						// the proxy throws a validation error. Setting it to true avoids that.
						descriptor.configurable = true;
					}
					return descriptor;
				}
			}
		},
		has(target, key) {
			// To prevent a false positive `is_entry_props` in the `prop` function
			if (key === STATE_SYMBOL || key === LEGACY_PROPS) return false;

			for (let p of target.props) {
				if (is_function(p)) p = p();
				if (p != null && key in p) return true;
			}

			return false;
		},
		ownKeys(target) {
			/** @type {Array<string | symbol>} */
			const keys = [];

			for (let p of target.props) {
				if (is_function(p)) p = p();
				if (!p) continue;

				for (const key in p) {
					if (!keys.includes(key)) keys.push(key);
				}

				for (const key of Object.getOwnPropertySymbols(p)) {
					if (!keys.includes(key)) keys.push(key);
				}
			}

			return keys;
		}
	};

	/**
	 * @param {Array<Record<string, unknown> | (() => Record<string, unknown>)>} props
	 * @returns {any}
	 */
	function spread_props(...props) {
		return new Proxy({ props }, spread_props_handler);
	}

	/**
	 * This function is responsible for synchronizing a possibly bound prop with the inner component state.
	 * It is used whenever the compiler sees that the component writes to the prop, or when it has a default prop_value.
	 * @template V
	 * @param {Record<string, unknown>} props
	 * @param {string} key
	 * @param {number} flags
	 * @param {V | (() => V)} [fallback]
	 * @returns {(() => V | ((arg: V) => V) | ((arg: V, mutation: boolean) => V))}
	 */
	function prop(props, key, flags, fallback) {
		var runes = !legacy_mode_flag || (flags & PROPS_IS_RUNES) !== 0;
		var bindable = (flags & PROPS_IS_BINDABLE) !== 0;
		var lazy = (flags & PROPS_IS_LAZY_INITIAL) !== 0;

		var fallback_value = /** @type {V} */ (fallback);
		var fallback_dirty = true;

		var get_fallback = () => {
			if (fallback_dirty) {
				fallback_dirty = false;

				fallback_value = lazy
					? untrack(/** @type {() => V} */ (fallback))
					: /** @type {V} */ (fallback);
			}

			return fallback_value;
		};

		/** @type {((v: V) => void) | undefined} */
		let setter;

		if (bindable) {
			// Can be the case when someone does `mount(Component, props)` with `let props = $state({...})`
			// or `createClassComponent(Component, props)`
			var is_entry_props = STATE_SYMBOL in props || LEGACY_PROPS in props;

			setter =
				get_descriptor(props, key)?.set ??
				(is_entry_props && key in props ? (v) => (props[key] = v) : undefined);
		}

		/** @type {V} */
		var initial_value;
		var is_store_sub = false;

		if (bindable) {
			[initial_value, is_store_sub] = capture_store_binding(() => /** @type {V} */ (props[key]));
		} else {
			initial_value = /** @type {V} */ (props[key]);
		}

		if (initial_value === undefined && fallback !== undefined) {
			initial_value = get_fallback();

			if (setter) {
				if (runes) props_invalid_value();
				setter(initial_value);
			}
		}

		/** @type {() => V} */
		var getter;

		if (runes) {
			getter = () => {
				var value = /** @type {V} */ (props[key]);
				if (value === undefined) return get_fallback();
				fallback_dirty = true;
				return value;
			};
		} else {
			getter = () => {
				var value = /** @type {V} */ (props[key]);

				if (value !== undefined) {
					// in legacy mode, we don't revert to the fallback value
					// if the prop goes from defined to undefined. The easiest
					// way to model this is to make the fallback undefined
					// as soon as the prop has a value
					fallback_value = /** @type {V} */ (undefined);
				}

				return value === undefined ? fallback_value : value;
			};
		}

		// prop is never written to — we only need a getter
		if (runes && (flags & PROPS_IS_UPDATED) === 0) {
			return getter;
		}

		// prop is written to, but the parent component had `bind:foo` which
		// means we can just call `$$props.foo = value` directly
		if (setter) {
			var legacy_parent = props.$$legacy;
			return /** @type {() => V} */ (
				function (/** @type {V} */ value, /** @type {boolean} */ mutation) {
					if (arguments.length > 0) {
						// We don't want to notify if the value was mutated and the parent is in runes mode.
						// In that case the state proxy (if it exists) should take care of the notification.
						// If the parent is not in runes mode, we need to notify on mutation, too, that the prop
						// has changed because the parent will not be able to detect the change otherwise.
						if (!runes || !mutation || legacy_parent || is_store_sub) {
							/** @type {Function} */ (setter)(mutation ? getter() : value);
						}

						return value;
					}

					return getter();
				}
			);
		}

		// Either prop is written to, but there's no binding, which means we
		// create a derived that we can write to locally.
		// Or we are in legacy mode where we always create a derived to replicate that
		// Svelte 4 did not trigger updates when a primitive value was updated to the same value.
		var overridden = false;

		var d = ((flags & PROPS_IS_IMMUTABLE) !== 0 ? derived : derived_safe_equal)(() => {
			overridden = false;
			return getter();
		});

		// Capture the initial value if it's bindable
		if (bindable) get(d);

		var parent_effect = /** @type {Effect} */ (active_effect);

		return /** @type {() => V} */ (
			function (/** @type {any} */ value, /** @type {boolean} */ mutation) {
				if (arguments.length > 0) {
					const new_value = mutation ? get(d) : runes && bindable ? proxy(value) : value;

					set(d, new_value);
					overridden = true;

					if (fallback_value !== undefined) {
						fallback_value = new_value;
					}

					return value;
				}

				// special case — avoid recalculating the derived if we're in a
				// teardown function and the prop was overridden locally, or the
				// component was already destroyed (people could access props in a timeout)
				if ((is_destroying_effect && overridden) || (parent_effect.f & DESTROYED) !== 0) {
					return d.v;
				}

				return get(d);
			}
		);
	}

	enable_legacy_mode_flag();

	/** @import { BlurParams, CrossfadeParams, DrawParams, FadeParams, FlyParams, ScaleParams, SlideParams, TransitionConfig } from './public' */


	/** @param {number} x */
	const linear$1 = (x) => x;

	/** @param {number} t */
	function cubic_out(t) {
		const f = t - 1.0;
		return f * f * f + 1.0;
	}

	/** @param {number | string} value
	 * @returns {[number, string]}
	 */
	function split_css_unit(value) {
		const split = typeof value === 'string' && value.match(/^\s*(-?[\d.]+)([^\s]*)\s*$/);
		return split ? [parseFloat(split[1]), split[2] || 'px'] : [/** @type {number} */ (value), 'px'];
	}

	/**
	 * Animates the opacity of an element from 0 to the current opacity for `in` transitions and from the current opacity to 0 for `out` transitions.
	 *
	 * @param {Element} node
	 * @param {FadeParams} [params]
	 * @returns {TransitionConfig}
	 */
	function fade(node, { delay = 0, duration = 400, easing = linear$1 } = {}) {
		const o = +getComputedStyle(node).opacity;
		return {
			delay,
			duration,
			easing,
			css: (t) => `opacity: ${t * o}`
		};
	}

	/**
	 * Animates the x and y positions and the opacity of an element. `in` transitions animate from the provided values, passed as parameters to the element's default values. `out` transitions animate from the element's default values to the provided values.
	 *
	 * @param {Element} node
	 * @param {FlyParams} [params]
	 * @returns {TransitionConfig}
	 */
	function fly(
		node,
		{ delay = 0, duration = 400, easing = cubic_out, x = 0, y = 0, opacity = 0 } = {}
	) {
		const style = getComputedStyle(node);
		const target_opacity = +style.opacity;
		const transform = style.transform === 'none' ? '' : style.transform;
		const od = target_opacity * (1 - opacity);
		const [x_value, x_unit] = split_css_unit(x);
		const [y_value, y_unit] = split_css_unit(y);
		return {
			delay,
			duration,
			easing,
			css: (t, u) => `
			transform: ${transform} translate(${(1 - t) * x_value}${x_unit}, ${(1 - t) * y_value}${y_unit});
			opacity: ${target_opacity - od * u}`
		};
	}

	/*
	Adapted from https://github.com/mattdesl
	Distributed under MIT License https://github.com/mattdesl/eases/blob/master/LICENSE.md
	*/

	/**
	 * @param {number} t
	 * @returns {number}
	 */
	function linear(t) {
		return t;
	}

	/**
	 * @param {number} t
	 * @returns {number}
	 */
	function cubicOut(t) {
		const f = t - 1.0;
		return f * f * f + 1.0;
	}

	/** @import { FlipParams, AnimationConfig } from './public.js' */

	/**
	 * The flip function calculates the start and end position of an element and animates between them, translating the x and y values.
	 * `flip` stands for [First, Last, Invert, Play](https://aerotwist.com/blog/flip-your-animations/).
	 *
	 * @param {Element} node
	 * @param {{ from: DOMRect; to: DOMRect }} fromTo
	 * @param {FlipParams} params
	 * @returns {AnimationConfig}
	 */
	function flip(node, { from, to }, params = {}) {
		var { delay = 0, duration = (d) => Math.sqrt(d) * 120, easing = cubicOut } = params;

		var style = getComputedStyle(node);

		// find the transform origin, expressed as a pair of values between 0 and 1
		var transform = style.transform === 'none' ? '' : style.transform;
		var [ox, oy] = style.transformOrigin.split(' ').map(parseFloat);
		ox /= node.clientWidth;
		oy /= node.clientHeight;

		// calculate effect of parent transforms and zoom
		var zoom = get_zoom(node); // https://drafts.csswg.org/css-viewport/#effective-zoom
		var sx = node.clientWidth / to.width / zoom;
		var sy = node.clientHeight / to.height / zoom;

		// find the starting position of the transform origin
		var fx = from.left + from.width * ox;
		var fy = from.top + from.height * oy;

		// find the ending position of the transform origin
		var tx = to.left + to.width * ox;
		var ty = to.top + to.height * oy;

		// find the translation at the start of the transform
		var dx = (fx - tx) * sx;
		var dy = (fy - ty) * sy;

		// find the relative scale at the start of the transform
		var dsx = from.width / to.width;
		var dsy = from.height / to.height;

		return {
			delay,
			duration: typeof duration === 'function' ? duration(Math.sqrt(dx * dx + dy * dy)) : duration,
			easing,
			css: (t, u) => {
				var x = u * dx;
				var y = u * dy;
				var sx = t + u * dsx;
				var sy = t + u * dsy;

				return `transform: ${transform} translate(${x}px, ${y}px) scale(${sx}, ${sy});`;
			}
		};
	}

	/**
	 * @param {Element} element
	 */
	function get_zoom(element) {
		if ('currentCSSZoom' in element) {
			return /** @type {number} */ (element.currentCSSZoom);
		}

		/** @type {Element | null} */
		var current = element;
		var zoom = 1;

		while (current !== null) {
			zoom *= +getComputedStyle(current).zoom;
			current = /** @type {Element | null} */ (current.parentElement);
		}

		return zoom;
	}

	/**
	 * @typedef {import('svelte').ComponentType} SvelteComponent
	 */

	/**
	 * @typedef {import('svelte/transition').FlyParams} FlyParams
	 */

	/**
	 * @typedef {Object} SvelteToastCustomComponent
	 * @property {SvelteComponent} src - custom Svelte Component
	 * @property {Object<string,any>} [props] - props to pass into custom component
	 * @property {string} [sendIdTo] - forward toast id to prop name
	 */

	/**
	 * @callback SvelteToastOnPopCallback
	 * @param {number} [id] - optionally get the toast id if needed
	 * @param {object} [details]
	 */

	/**
	 * @typedef {Object} SvelteToastOptions
	 * @property {number} [id] - unique id generated for every toast
	 * @property {string} [target] - container target name to send toast to
	 * @property {string} [msg] - toast message
	 * @property {number} [duration] - duration of progress bar tween from initial to next
	 * @property {number} [initial] - initial progress bar value
	 * @property {number} [next] - next progress bar value
	 * @property {boolean} [pausable] - pause progress bar tween on mouse hover
	 * @property {boolean} [dismissable] - allow dissmiss with close button
	 * @property {boolean} [reversed] - display toasts in reverse order
	 * @property {FlyParams} [intro] - toast intro fly animation settings
	 * @property {Object<string,string|number>} [theme] - css var overrides
	 * @property {string[]} [classes] - user-defined classes
	 * @property {SvelteToastOnPopCallback} [onpop] - callback that runs on toast dismiss
	 * @property {SvelteToastCustomComponent} [component] - send custom Svelte Component as a message
	 * @property {number} [progress] - DEPRECATED
	 */

	/** @type {SvelteToastOptions} */
	const defaults = {
	  duration: 4000,
	  initial: 1,
	  next: 0,
	  pausable: false,
	  dismissable: true,
	  reversed: false,
	  intro: { x: 256 }
	};

	function createToast() {
	  const { subscribe, update } = writable(new Array());
	  /** @type {Object<string,SvelteToastOptions>} */
	  const options = {};
	  let count = 0;

	  /** @param {any} obj */
	  function _obj(obj) {
	    return obj instanceof Object
	  }

	  function _init(target = 'default', opts = {}) {
	    options[target] = opts;
	    return options
	  }

	  /**
	   * Send a new toast
	   * @param {(string|SvelteToastOptions)} msg
	   * @param {SvelteToastOptions} [opts]
	   * @returns {number}
	   */
	  function push(msg, opts) {
	    const param = {
	      target: 'default',
	      ...(_obj(msg) ? /** @type {SvelteToastOptions} */ (msg) : { ...opts, msg })
	    };
	    const conf = options[param.target] || {};
	    const entry = {
	      ...defaults,
	      ...conf,
	      ...param,
	      theme: { ...conf.theme, ...param.theme },
	      classes: [...(conf.classes || []), ...(param.classes || [])],
	      id: ++count
	    };
	    update((n) => (entry.reversed ? [...n, entry] : [entry, ...n]));
	    return count
	  }

	  /**
	   * Remove toast(s)
	   * - toast.pop() // removes the last toast
	   * - toast.pop(0) // remove all toasts
	   * - toast.pop(id) // removes the toast with specified `id`
	   * - toast.pop({ target: 'foo' }) // remove all toasts from target `foo`
	   * @param {(number|Object<'target',string>)} [id]
	   */
	  function pop(id) {
	    update((n) => {
	      if (!n.length || id === 0) return []
	      // Filter function is deprecated; shim added for backward compatibility
	      if (typeof id === 'function') return n.filter((i) => id(i))
	      if (_obj(id))
	        return n.filter(/** @type {SvelteToastOptions[]} i */ (i) => i.target !== id.target)
	      const found = id || Math.max(...n.map((i) => i.id));
	      return n.filter((i) => i.id !== found)
	    });
	  }

	  /**
	   * Update an existing toast
	   * @param {(number|SvelteToastOptions)} id
	   * @param {SvelteToastOptions} [opts]
	   */
	  function set(id, opts) {
	    /** @type {any} */
	    const param = _obj(id) ? id : { ...opts, id };
	    update((n) => {
	      const idx = n.findIndex((i) => i.id === param.id);
	      if (idx > -1) {
	        n[idx] = { ...n[idx], ...param };
	      }
	      return n
	    });
	  }

	  return { subscribe, push, pop, set, _init }
	}

	const toast = createToast();

	/**
	 * @param {any} obj
	 * @returns {obj is Date}
	 */
	function is_date(obj) {
		return Object.prototype.toString.call(obj) === '[object Date]';
	}

	/** @import { Task } from '../internal/client/types' */
	/** @import { Tweened, TweenOptions } from './public' */

	/**
	 * @template T
	 * @param {T} a
	 * @param {T} b
	 * @returns {(t: number) => T}
	 */
	function get_interpolator(a, b) {
		if (a === b || a !== a) return () => a;

		const type = typeof a;
		if (type !== typeof b || Array.isArray(a) !== Array.isArray(b)) {
			throw new Error('Cannot interpolate values of different type');
		}

		if (Array.isArray(a)) {
			const arr = /** @type {Array<any>} */ (b).map((bi, i) => {
				return get_interpolator(/** @type {Array<any>} */ (a)[i], bi);
			});

			// @ts-ignore
			return (t) => arr.map((fn) => fn(t));
		}

		if (type === 'object') {
			if (!a || !b) {
				throw new Error('Object cannot be null');
			}

			if (is_date(a) && is_date(b)) {
				const an = a.getTime();
				const bn = b.getTime();
				const delta = bn - an;

				// @ts-ignore
				return (t) => new Date(an + t * delta);
			}

			const keys = Object.keys(b);

			/** @type {Record<string, (t: number) => T>} */
			const interpolators = {};
			keys.forEach((key) => {
				// @ts-ignore
				interpolators[key] = get_interpolator(a[key], b[key]);
			});

			// @ts-ignore
			return (t) => {
				/** @type {Record<string, any>} */
				const result = {};
				keys.forEach((key) => {
					result[key] = interpolators[key](t);
				});
				return result;
			};
		}

		if (type === 'number') {
			const delta = /** @type {number} */ (b) - /** @type {number} */ (a);
			// @ts-ignore
			return (t) => a + t * delta;
		}

		// for non-numeric values, snap to the final value immediately
		return () => b;
	}

	/**
	 * A tweened store in Svelte is a special type of store that provides smooth transitions between state values over time.
	 *
	 * @deprecated Use [`Tween`](https://svelte.dev/docs/svelte/svelte-motion#Tween) instead
	 * @template T
	 * @param {T} [value]
	 * @param {TweenOptions<T>} [defaults]
	 * @returns {Tweened<T>}
	 */
	function tweened(value, defaults = {}) {
		const store = writable(value);
		/** @type {Task} */
		let task;
		let target_value = value;
		/**
		 * @param {T} new_value
		 * @param {TweenOptions<T>} [opts]
		 */
		function set(new_value, opts) {
			target_value = new_value;

			if (value == null) {
				store.set((value = new_value));
				return Promise.resolve();
			}

			/** @type {Task | null} */
			let previous_task = task;

			let started = false;
			let {
				delay = 0,
				duration = 400,
				easing = linear,
				interpolate = get_interpolator
			} = { ...defaults, ...opts };

			if (duration === 0) {
				if (previous_task) {
					previous_task.abort();
					previous_task = null;
				}
				store.set((value = target_value));
				return Promise.resolve();
			}

			const start = raf.now() + delay;

			/** @type {(t: number) => T} */
			let fn;
			task = loop((now) => {
				if (now < start) return true;
				if (!started) {
					fn = interpolate(/** @type {any} */ (value), new_value);
					if (typeof duration === 'function')
						duration = duration(/** @type {any} */ (value), new_value);
					started = true;
				}
				if (previous_task) {
					previous_task.abort();
					previous_task = null;
				}
				const elapsed = now - start;
				if (elapsed > /** @type {number} */ (duration)) {
					store.set((value = new_value));
					return false;
				}
				// @ts-ignore
				store.set((value = fn(easing(elapsed / duration))));
				return true;
			});
			return task.promise;
		}
		return {
			set,
			update: (fn, opts) =>
				set(fn(/** @type {any} */ (target_value), /** @type {any} */ (value)), opts),
			subscribe: store.subscribe
		};
	}

	ToastItem[FILENAME] = 'node_modules/@zerodevx/svelte-toast/dist/ToastItem.svelte';

	var root_3$1 = add_locations(from_html(`<div class="_toastBtn pe svelte-1irx82o" role="button" tabindex="0"></div>`), ToastItem[FILENAME], [[104, 4]]);
	var root$3 = add_locations(from_html(`<div role="status"><div><!></div> <!> <progress class="_toastBar svelte-1irx82o"></progress></div>`), ToastItem[FILENAME], [[87, 0, [[96, 2], [114, 2]]]]);

	function ToastItem($$anchor, $$props) {
		check_target(new.target);
		push($$props, false);

		var $$ownership_validator = create_ownership_validator($$props);

		const $progress = () => (
			validate_store(progress),
			store_get(progress, '$progress', $$stores)
		);

		const [$$stores, $$cleanup] = setup_stores();

		/** @type {import('./stores.js').SvelteToastOptions} */
		let item = prop($$props, 'item', 12);

		/** @type {any} */
		let next = mutable_source(item().initial);

		let prev = mutable_source(get(next));
		let paused = mutable_source(false);
		let cprops = mutable_source({});

		/** @type {any} */
		let unlisten;

		/** @type {MouseEvent | KeyboardEvent} */
		let event$1;

		const progress = tweened(item().initial, { duration: item().duration, easing: linear });

		/** @param {MouseEvent|KeyboardEvent|undefined} [ev] */
		function close(ev) {
			if (ev) event$1 = ev;

			toast.pop(item().id);
		}

		function autoclose() {
			if (strict_equals($progress(), 1) || strict_equals($progress(), 0)) close();
		}

		function pause() {
			if (!get(paused) && strict_equals($progress(), get(next), false)) {
				progress.set($progress(), { duration: 0 });
				set(paused, true);
			}
		}

		function resume() {
			if (get(paused)) {
				const d = /** @type {any} */ item().duration;
				const duration = d - d * (($progress() - get(prev)) / (get(next) - get(prev)));

				progress.set(get(next), { duration }).then(autoclose);
				set(paused, false);
			}
		}

		/** @param {any} prop */
		function check(prop, kind = 'undefined') {
			return strict_equals(typeof prop, kind);
		}

		function listen(d = document) {
			if (check(d.hidden)) return;

			const handler = () => d.hidden ? pause() : resume();
			const name = 'visibilitychange';

			d.addEventListener(name, handler);
			unlisten = () => d.removeEventListener(name, handler);
			handler();
		}

		// `progress` has been renamed to `next`; shim included for backward compatibility, to remove in next major
		onMount(listen);

		onDestroy(() => {
			item().onpop && item().onpop(item().id, { event: event$1 });
			unlisten && unlisten();
		});

		legacy_pre_effect(() => (get(next), deep_read_state(item()), $progress()), () => {
			if (strict_equals(get(next), item().next, false)) {
				set(next, item().next);
				set(prev, $progress());
				set(paused, false);
				progress.set(get(next)).then(autoclose);
			}
		});

		legacy_pre_effect(() => (deep_read_state(item())), () => {
			if (item().component) {
				const { props = {}, sendIdTo } = item().component;

				set(cprops, { ...props, ...sendIdTo && { [sendIdTo]: item().id } });
			}
		});

		legacy_pre_effect(() => (deep_read_state(item())), () => {
			if (!check(item().progress)) {
				$$ownership_validator.mutation(null, ['item', 'next'], item(item().next = item().progress, true), 76, 2);
			}
		});

		legacy_pre_effect_reset();

		var $$exports = { ...legacy_api() };

		init();

		var div = root$3();
		let classes;
		var div_1 = child(div);
		let classes_1;
		var node = child(div_1);

		{
			var consequent = ($$anchor) => {
				var fragment = comment();
				var node_1 = first_child(fragment);

				add_svelte_meta(
					() => component(node_1, () => item().component.src, ($$anchor, $$component) => {
						$$component($$anchor, spread_props(() => get(cprops)));
					}),
					'component',
					ToastItem,
					98,
					6,
					{ componentTag: 'svelte:component' }
				);

				append($$anchor, fragment);
			};

			var alternate = ($$anchor) => {
				var fragment_1 = comment();
				var node_2 = first_child(fragment_1);

				html(node_2, () => (deep_read_state(item()), untrack(() => item().msg)));
				append($$anchor, fragment_1);
			};

			add_svelte_meta(
				() => if_block(node, ($$render) => {
					if ((deep_read_state(item()), untrack(() => item().component))) $$render(consequent); else $$render(alternate, -1);
				}),
				'if',
				ToastItem,
				97,
				4
			);
		}

		var node_3 = sibling(div_1, 2);

		{
			var consequent_1 = ($$anchor) => {
				var div_2 = root_3$1();

				event('click', div_2, function click(ev) {
					return close(ev);
				});

				event('keydown', div_2, function keydown(ev) {
					if (ev instanceof KeyboardEvent && ['Enter', ' '].includes(ev.key)) close(ev);
				});

				append($$anchor, div_2);
			};

			add_svelte_meta(
				() => if_block(node_3, ($$render) => {
					if ((
						deep_read_state(item()),
						untrack(() => item().dismissable)
					)) $$render(consequent_1);
				}),
				'if',
				ToastItem,
				103,
				2
			);
		}

		var progress_1 = sibling(node_3, 2);

		template_effect(() => {
			classes = set_class(div, 1, '_toastItem svelte-1irx82o', null, classes, { pe: item().pausable });
			classes_1 = set_class(div_1, 1, '_toastMsg svelte-1irx82o', null, classes_1, { pe: item().component });
			set_value(progress_1, $progress());
		});

		event('mouseenter', div, function mouseenter() {
			if (item().pausable) pause();
		});

		event('mouseleave', div, resume);
		append($$anchor, div);

		var $$pop = pop($$exports);

		$$cleanup();

		return $$pop;
	}

	SvelteToast[FILENAME] = 'node_modules/@zerodevx/svelte-toast/dist/SvelteToast.svelte';

	var root_1$1 = add_locations(from_html(`<li><!></li>`), SvelteToast[FILENAME], [[27, 4]]);
	var root$2 = add_locations(from_html(`<ul class="_toastContainer svelte-1dwp7pi"></ul>`), SvelteToast[FILENAME], [[25, 0]]);

	function SvelteToast($$anchor, $$props) {
		check_target(new.target);
		push($$props, false);

		const $toast = () => (
			validate_store(toast),
			store_get(toast, '$toast', $$stores)
		);

		const [$$stores, $$cleanup] = setup_stores();

		/** @type {import('./stores.js').SvelteToastOptions} */
		let options = prop($$props, 'options', 24, () => ({}));

		/** @type {(string|'default')} */
		let target = prop($$props, 'target', 8, 'default');

		/** @type {import('./stores.js').SvelteToastOptions[]} */
		let items = mutable_source([]);

		/** @param {Object<string,string|number>} [theme] */
		function getCss(theme) {
			return theme
				? Object.keys(theme).reduce((a, c) => `${a}${c}:${theme[c]};`, '')
				: undefined;
		}

		legacy_pre_effect(
			() => (
				deep_read_state(target()),
				deep_read_state(options())
			),
			() => {
				toast._init(target(), options());
			}
		);

		legacy_pre_effect(() => ($toast(), deep_read_state(target())), () => {
			set(items, $toast().filter((i) => strict_equals(i.target, target())));
		});

		legacy_pre_effect_reset();

		var $$exports = { ...legacy_api() };

		init();

		var ul = root$2();

		add_svelte_meta(
			() => each(ul, 13, () => get(items), (item) => item.id, ($$anchor, item) => {
				var li = root_1$1();
				var node = child(li);

				add_svelte_meta(
					() => ToastItem(node, {
						get item() {
							return get(item);
						}
					}),
					'component',
					SvelteToast,
					34,
					6,
					{ componentTag: 'ToastItem' }
				);

				reset(li);

				template_effect(
					($0, $1) => {
						set_class(li, 1, $0, 'svelte-1dwp7pi');
						set_style(li, $1);
					},
					[
						() => clsx((get(item), untrack(() => get(item).classes?.join(' ')))),
						() => (get(item), untrack(() => getCss(get(item).theme)))
					]
				);

				transition(1, li, () => fly, () => get(item).intro);
				transition(2, li, () => fade);
				animation(li, () => flip, () => ({ duration: 200 }));
				append($$anchor, li);
			}),
			'each',
			SvelteToast,
			26,
			2
		);
		append($$anchor, ul);

		var $$pop = pop($$exports);

		$$cleanup();

		return $$pop;
	}

	ThemeToggle[FILENAME] = 'src/components/ThemeToggle.svelte';

	var root$1 = add_locations(from_html(`<input type="button" data-theme-toggle=""/>`), ThemeToggle[FILENAME], [[33, 0]]);

	function ThemeToggle($$anchor, $$props) {
		check_target(new.target);
		push($$props, true);

		var _a;

		// ts-ignore
		const getTheme = (
			{
				localStorageTheme: string = localStorageTheme,
				systemSettingDark: MediaQueryList = systemSettingDark
			}
		) => {
			if (strict_equals(localStorageTheme, null, false)) return localStorageTheme;
			if (systemSettingDark.matches) return dark;

			return light;
		};

		const update = (theme) => {
			set(value, strict_equals(theme, dark) ? "🌞" : "🌚", true);
			document.querySelector("html").setAttribute("data-theme", theme);
		};

		const handleClick = () => {
			const newTheme = strict_equals(currentThemeSetting, dark) ? light : dark;

			localStorage.setItem("theme", newTheme);
			update(newTheme);
			currentThemeSetting = newTheme;
		};

		const light = "light";
		const dark = "dark";
		const localStorageTheme = strict_equals(_a = localStorage.getItem("theme"), null, false) && strict_equals(_a, void 0, false) ? _a : '';
		const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");
		let currentThemeSetting = getTheme({ localStorageTheme, systemSettingDark });
		let value = tag(state("🌞"), 'value');

		update(currentThemeSetting);

		var $$exports = { ...legacy_api() };
		var input = root$1();

		template_effect(() => {
			set_attribute(input, 'aria-label', strict_equals(get(value), "🌚") ? "Change to dark theme." : "Change to light theme.");
			set_value(input, get(value));
		});

		delegated('click', input, handleClick);
		append($$anchor, input);

		return pop($$exports);
	}

	delegate(['click']);

	const MILLISECONDS_PER_MINUTE = 60000;
	const minuteKeyFromTimestamp = (timestamp) => `${Math.floor(timestamp / MILLISECONDS_PER_MINUTE)}`;
	const formatLogTimeCell = (key) => {
	    const numericKey = typeof key === 'string' ? Number(key) : key;
	    const reconstructed = new Date(numericKey * MILLISECONDS_PER_MINUTE);
	    const hours = reconstructed.getHours();
	    const minutes = reconstructed.getMinutes();
	    const padding = `${minutes}`.length === 1 ? '0' : '';
	    return `${hours}:${padding}${minutes}`;
	};
	const formatDurationCell = (current, previous) => {
	    if (previous == null)
	        return 'N/A';
	    const currentNumeric = typeof current === 'string' ? Number(current) : current;
	    const previousNumeric = typeof previous === 'string' ? Number(previous) : previous;
	    return `${currentNumeric - previousNumeric} min`;
	};
	const toSortedEntries = (data) => Object.entries(data)
	    .map(([key, value]) => ({ key, value }))
	    .sort((a, b) => Number(a.key) - Number(b.key));
	const normalizeActivity = (value) => (value !== null && value !== void 0 ? value : '').toLowerCase().trim();

	const THEME_STORAGE_KEY = 'theme';
	const getActivityData = (storage = window.localStorage) => {
	    const data = {};
	    for (let i = 0; i < storage.length; i++) {
	        const key = storage.key(i);
	        if (key == null || key === THEME_STORAGE_KEY)
	            continue;
	        const value = storage.getItem(key);
	        if (value == null)
	            continue;
	        data[key] = value;
	    }
	    return data;
	};
	const clearActivityDataPreservingTheme = (storage = window.localStorage) => {
	    var _a;
	    const theme = (_a = storage.getItem(THEME_STORAGE_KEY)) !== null && _a !== void 0 ? _a : '';
	    storage.clear();
	    storage.setItem(THEME_STORAGE_KEY, theme);
	};

	App[FILENAME] = 'src/App.svelte';

	var root_1 = add_locations(from_html(`<h2 class="svelte-1n46o8q">Latest Log</h2> <table class="svelte-1n46o8q"><thead><tr><th colspan="1">Log Time</th><th colspan="1">Duration</th><th colspan="1">Activity</th></tr></thead><tbody><tr><td> </td><td> </td><td> </td></tr></tbody></table>`, 1), App[FILENAME], [
		[76, 4],
		[
			77,
			4,
			[
				[78, 8, [[79, 12, [[80, 16], [81, 16], [82, 16]]]]],
				[85, 8, [[86, 12, [[87, 16], [88, 16], [94, 16]]]]]
			]
		]
	]);

	var root_3 = add_locations(from_html(`<tr><td> </td><td> </td><td> </td></tr>`), App[FILENAME], [[111, 16, [[112, 20], [113, 20], [114, 20]]]]);

	var root_2 = add_locations(from_html(`<h2 class="svelte-1n46o8q">Full Summary</h2> <table class="svelte-1n46o8q"><thead><tr><th colspan="1">Log Time</th><th colspan="1">Duration</th><th colspan="1">Activity</th></tr></thead><tbody></tbody></table> <input type="button" value="New Day" class="svelte-1n46o8q"/>`, 1), App[FILENAME], [
		[100, 4],
		[
			101,
			4,
			[
				[102, 8, [[103, 12, [[104, 16], [105, 16], [106, 16]]]]],
				[109, 8]
			]
		],
		[119, 4]
	]);

	var root_4 = add_locations(from_html(`<input class="floating svelte-1n46o8q" type="button" value="🖋️"/>`), App[FILENAME], [[122, 4]]);

	var root = add_locations(from_html(`<!> <h1 class="svelte-1n46o8q">Time Log</h1> <div class="form-wrapper svelte-1n46o8q"><form action="" class="svelte-1n46o8q"><div class="svelte-1n46o8q"><label for="activity">&nbsp;Activity:</label> <br/> <input type="text" name="Activity" id="activity" class="svelte-1n46o8q"/></div> <input type="submit" value="Log Time" class="svelte-1n46o8q"/></form></div> <!> <!> <!> <div id="theme-wrapper" class="svelte-1n46o8q"><!></div> <footer class="svelte-1n46o8q"><a href="https://github.com/matthewnoel/time-log" target="_blank" class="svelte-1n46o8q">The Code</a> <a href="https://raw.githubusercontent.com/matthewnoel/time-log/main/third-party-licenses.txt" target="_blank" class="svelte-1n46o8q">Third-Party Licenses</a></footer>`, 1), App[FILENAME], [
		[58, 0],
		[
			59,
			0,
			[[60, 4, [[61, 8, [[62, 12], [63, 12], [64, 12]]], [72, 8]]]]
		],
		[129, 0],
		[132, 0, [[133, 4], [136, 4]]]
	]);

	function App($$anchor, $$props) {
		check_target(new.target);
		push($$props, true);

		const updateCurrentData = () => set(currentData, getActivityData(), true);

		const handleNewDayClick = () => {
			clearActivityDataPreservingTheme();
			updateCurrentData();
			toast.push(`Cleared yesterday's activities!`);
		};

		const handleActivityFormSubmit = () => {
			const key = minuteKeyFromTimestamp(Date.now());

			if (equals(window.localStorage.getItem(key), null, false)) {
				toast.push(`Cannot update twice per-minute.`);

				return;
			}

			const previous = get(entries)[get(entries).length - 1];

			if (equals(previous, null, false) && strict_equals(normalizeActivity(previous.value), normalizeActivity(get(value)))) {
				window.localStorage.removeItem(previous.key);
			}

			window.localStorage.setItem(key, get(value));
			set(value, "");
			updateCurrentData();
		};

		const handleGoToInputClick = () => {
			const matches = document.querySelectorAll("input[type=text]");

			if (matches.length < 1) return;

			matches[0].focus();
		};

		const useEventListeners = (node) => {
			const handleFocus = () => {
				set(isActivityInputInFocus, true);
				node && strict_equals(typeof node.select, "function") && node.select();
			};

			const handleBlur = () => {
				set(isActivityInputInFocus, false);
			};

			node.addEventListener("focus", handleFocus);
			node.addEventListener("blur", handleBlur);

			return {
				destroy() {
					node.removeEventListener("focus", handleFocus);
					node.removeEventListener("blur", handleBlur);
				}
			};
		};

		let value = tag(state(void 0), 'value');
		let isActivityInputInFocus = tag(state(void 0), 'isActivityInputInFocus');
		let currentData = tag(state(proxy(getActivityData())), 'currentData');
		let entries = tag(user_derived(() => toSortedEntries(get(currentData))), 'entries');
		var $$exports = { ...legacy_api() };
		var fragment = root();
		var node_1 = first_child(fragment);

		add_svelte_meta(() => SvelteToast(node_1, {}), 'component', App, 57, 0, { componentTag: 'SvelteToast' });

		var div = sibling(node_1, 4);
		var form = child(div);
		var event_handler = user_derived(() => preventDefault(handleActivityFormSubmit));
		var div_1 = child(form);
		var input = sibling(child(div_1), 4);

		effect(() => bind_value(
			input,
			function get$1() {
				return get(value);
			},
			function set$1($$value) {
				set(value, $$value);
			}
		));

		action(input, ($$node) => useEventListeners?.($$node));

		var input_1 = sibling(div_1, 2);

		var node_2 = sibling(div, 2);

		{
			var consequent = ($$anchor) => {
				var fragment_1 = root_1();
				var table = sibling(first_child(fragment_1), 2);
				var tbody = sibling(child(table));
				var tr = child(tbody);
				var td = child(tr);
				var text = child(td);

				var td_1 = sibling(td);
				var text_1 = child(td_1);

				var td_2 = sibling(td_1);
				var text_2 = child(td_2);

				template_effect(
					($0, $1) => {
						set_text(text, $0);
						set_text(text_1, $1);
						set_text(text_2, get(entries)[get(entries).length - 1].value);
					},
					[
						() => formatLogTimeCell(get(entries)[get(entries).length - 1].key),
						() => formatDurationCell(get(entries)[get(entries).length - 1].key, get(entries)[get(entries).length - 2].key)
					]
				);

				append($$anchor, fragment_1);
			};

			add_svelte_meta(
				() => if_block(node_2, ($$render) => {
					if (get(entries).length > 1) $$render(consequent);
				}),
				'if',
				App,
				75,
				0
			);
		}

		var node_3 = sibling(node_2, 2);

		{
			var consequent_1 = ($$anchor) => {
				var fragment_2 = root_2();
				var table_1 = sibling(first_child(fragment_2), 2);
				var tbody_1 = sibling(child(table_1));

				add_svelte_meta(
					() => each(tbody_1, 21, () => get(entries), index, ($$anchor, $$item, i, $$array) => {
						let key = () => get($$item).key;

						key();

						let value = () => get($$item).value;

						value();

						var tr_1 = root_3();
						var td_3 = child(tr_1);
						var text_3 = child(td_3, true);

						reset(td_3);

						var td_4 = sibling(td_3);
						var text_4 = child(td_4, true);

						reset(td_4);

						var td_5 = sibling(td_4);
						var text_5 = child(td_5, true);

						reset(td_5);
						reset(tr_1);

						template_effect(
							($0, $1) => {
								set_text(text_3, $0);
								set_text(text_4, $1);
								set_text(text_5, value());
							},
							[
								() => formatLogTimeCell(key()),
								() => formatDurationCell(key(), get(entries)[i - 1]?.key)
							]
						);

						append($$anchor, tr_1);
					}),
					'each',
					App,
					110,
					12
				);

				var input_2 = sibling(table_1, 2);

				delegated('click', input_2, handleNewDayClick);
				append($$anchor, fragment_2);
			};

			add_svelte_meta(
				() => if_block(node_3, ($$render) => {
					if (get(entries).length > 0) $$render(consequent_1);
				}),
				'if',
				App,
				99,
				0
			);
		}

		var node_4 = sibling(node_3, 2);

		{
			var consequent_2 = ($$anchor) => {
				var input_3 = root_4();

				delegated('click', input_3, handleGoToInputClick);
				append($$anchor, input_3);
			};

			add_svelte_meta(
				() => if_block(node_4, ($$render) => {
					if (!get(isActivityInputInFocus)) $$render(consequent_2);
				}),
				'if',
				App,
				121,
				0
			);
		}

		var div_2 = sibling(node_4, 2);
		var node_5 = child(div_2);

		add_svelte_meta(() => ThemeToggle(node_5, {}), 'component', App, 130, 4, { componentTag: 'ThemeToggle' });
		template_effect(($0) => input_1.disabled = $0, [() => !get(value)?.trim()]);

		event('submit', form, function (...$$args) {
			apply(() => get(event_handler), this, $$args, App, [60, 30], true);
		});

		append($$anchor, fragment);

		return pop($$exports);
	}

	delegate(['click']);

	var app = mount(App, {
		target: document.body
	});

	return app;

})();
//# sourceMappingURL=bundle.js.map
