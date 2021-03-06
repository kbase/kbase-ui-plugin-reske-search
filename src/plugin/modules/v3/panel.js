/*
Top level panel for jgi search
*/
define([
    'knockout-plus',
    './utils'
], function (
    ko,
    utils
) {
    'use strict';

    function factory(config) {
        var runtime = config.runtime;
        var hostNode, container;

        function attach(node) {
            hostNode = node;
            container = hostNode.appendChild(document.createElement('div'));
            container.classList.add('plugin-reske-search');
        }

        function start() {
            runtime.send('ui', 'setTitle', 'Search 2');

            container.innerHTML = utils.komponent({
                name: 'reske-search/v3/main',
                params: {
                    runtime: 'runtime'
                }
            });
            var vm = {
                runtime: runtime
            };
            ko.applyBindings(vm, container);
        }

        function stop() {
            // nothing yet.
        }

        function detach() {
            if (hostNode && container) {
                hostNode.removeChild(container);
                container.innerHTML = '';
            }
        }

        return {
            attach: attach,
            start: start,
            stop: stop,
            detach: detach
        };
    }

    return {
        make: function (config) {
            return factory(config);
        }
    };
});
