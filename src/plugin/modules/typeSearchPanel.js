define([
    'knockout-plus',
    'kb_common/html',

    './components/type-search'
], function (
    ko,
    html
) {
    var t = html.tag,
        div = t('div');

    function factory(config) {
        var hostNode, container, runtime = config.runtime;

        function render(params) {
            container.innerHTML = div({
                dataBind: {
                    component: {
                        name: '"reske-type-search"',
                        params: {
                            runtime: 'runtime',
                            search: 'search'
                        }
                    }
                }
            });
            ko.applyBindings(params, container);
        }

        // WIDGET API

        function attach(node) {
            hostNode = node;
            container = hostNode.appendChild(document.createElement('div'));
        }

        function start(params) {
            runtime.send('ui', 'setTitle', 'RESKE Search Prototype');
            render({
                runtime: runtime,
                search: params.search || null
            });
        }

        function stop() {}

        function detach() {
            if (hostNode && container) {
                hostNode.removeChild(container);
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