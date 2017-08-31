define([
    'knockout-plus',
    'highlight',
    'kb_common/html',
    '../common',

    'css!./browse.css'
], function (
    ko,
    highlight,
    html,
    common
) {
    'use strict';

    var t = html.tag,
        a = t('a'),
        span = t('span'),
        pre = t('pre'),
        code = t('code'),
        div = t('div'),
        img = t('img'),
        table = t('table'),
        tr = t('tr'),
        th = t('th'),
        td = t('td');

    function viewModel(params) {
        function doOpenNarrative(data) {
            var url = '/narrative/' + data.item.meta.narrativeId;
            window.open(url, '_blank');
        }

        function doKeep(data) {
            console.log('keeping...', data);
        }
        console.log('narrative', params.item);
        return {
            item: params.item,
            doOpenNarrative: doOpenNarrative,
            doKeep: doKeep
        };
    }

    function buildMarkdown() {
        // TODO okay, maybe we do need a separate list of markdown cells; we want to
        // detect that there are any before inserting the collapsible panel.
        // manual panel, start closed
        return [
            '<!-- ko if: item.narrative.markdownCells.cells.length > 0 -->',
            '<!-- ko with: item.narrative.markdownCells -->',
            div({
                dataBind: {
                    css: {
                        '-active': 'show()'
                    }
                },
                class: '-markdown'
            }, [
                div({
                    style: {
                        display: 'inline-block',
                        width: '5%'
                    }
                }),
                div({
                    style: {
                        display: 'inline-block',
                        width: '95%'
                    }
                }, [
                    // title and collapse control
                    div({
                        class: '-toggler'
                    }, [
                        span({
                            dataBind: {
                                click: 'doToggleShow',
                                css: {
                                    showing: 'show'
                                }
                            },
                            style: {
                                cursor: 'pointer'
                            }
                        }, [
                            'view markdown',
                            span({
                                dataBind: {
                                    css: {
                                        'fa-arrow-right -deg45': '!show()',
                                        'fa-arrow-down': 'show()'
                                    }
                                },
                                class: 'fa',
                                style: {
                                    marginLeft: '4px'
                                }
                            })
                        ])
                    ]),
                    // body
                    div({
                        dataBind: {
                            visible: 'show'
                        },
                        class: '-content'
                    }, [
                        // div({
                        //     style: {
                        //         padding: '4px 0',
                        //         fontWeight: 'bold'
                        //     }
                        // }, 'Markdown cells'),
                        div({
                            style: {
                                border: '1px silver solid',
                                padding: '6px;'
                            }
                        }, [
                            '<!-- ko foreach: cells -->',
                            div({
                                class: '-item'
                            }, [

                                div({
                                    dataBind: {
                                        html: 'html'
                                    },
                                    class: '-html',
                                    style: {
                                        display: 'inline-block',
                                        verticalAlign: 'top',
                                        width: '100%'
                                    }
                                })
                            ]),
                            '<!-- /ko -->'
                        ])
                    ])
                ])
            ]),
            '<!-- /ko -->',
            '<!-- /ko -->'
        ];
    }

    function buildCellsPreview() {
        // TODO okay, maybe we do need a separate list of markdown cells; we want to
        // detect that there are any before inserting the collapsible panel.
        // manual panel, start closed
        return [
            '<!-- ko if: item.narrative.cells.cells.length > 0 -->',
            '<!-- ko with: item.narrative.cells -->',
            div({
                dataBind: {
                    css: {
                        '-active': 'show()'
                    }
                },
                class: '-markdown'
            }, [
                div({
                    style: {
                        display: 'inline-block',
                        width: '5%'
                    }
                }),
                div({
                    style: {
                        display: 'inline-block',
                        width: '95%'
                    }
                }, [
                    // title and collapse control
                    div({
                        class: '-toggler'
                    }, [
                        span({
                            dataBind: {
                                click: 'doToggleShow',
                                css: {
                                    showing: 'show'
                                }
                            },
                            style: {
                                cursor: 'pointer'
                            }
                        }, [
                            'preview',
                            span({
                                dataBind: {
                                    css: {
                                        'fa-arrow-right -deg45': '!show()',
                                        'fa-arrow-down': 'show()'
                                    }
                                },
                                class: 'fa',
                                style: {
                                    marginLeft: '4px'
                                }
                            })
                        ])
                    ]),
                    // body
                    div({
                        dataBind: {
                            visible: 'show'
                        },
                        class: '-content'
                    }, [
                        // div({
                        //     style: {
                        //         padding: '4px 0',
                        //         fontWeight: 'bold'
                        //     }
                        // }, 'Markdown cells'),
                        div({
                            style: {
                                border: '1px silver solid',
                                padding: '6px;'
                            }
                        }, [
                            '<!-- ko foreach: cells -->',
                            div({
                                class: '-item'
                            }, [
                                div({
                                    dataBind: {
                                        click: 'doToggleShow'
                                    },
                                    class: '-type'
                                }, [
                                    span({
                                        dataBind: {
                                            text: 'type'
                                        }
                                    }),
                                    '<!-- ko if: show() -->',
                                    span({
                                        class: 'fa fa-chevron-down',
                                        style: {
                                            fontSize: '80%',
                                            marginLeft: '3px'
                                        }
                                    }),
                                    '<!-- /ko -->',
                                    '<!-- ko if: !show() -->',
                                    span({
                                        class: 'fa fa-chevron-right',
                                        style: {
                                            fontSize: '80%',
                                            marginLeft: '3px'
                                        }
                                    }),
                                    '<!-- /ko -->'
                                ]),
                                '<!-- ko if: show() -->',

                                '<!-- ko if: type === "markdown" -->',
                                div({
                                    dataBind: {
                                        html: 'html'
                                    },
                                    class: '-html',
                                    style: {
                                        display: 'inline-block',
                                        verticalAlign: 'top',
                                        width: '100%'
                                    }
                                }),
                                '<!-- /ko -->',
                                '<!-- ko if: type === "code" -->',
                                div({}, [
                                    pre(code({
                                        dataBind: {
                                            text: 'source'
                                        }
                                    }))
                                ]),
                                '<!-- /ko -->',
                                '<!-- ko if: type === "app" -->',
                                '<!-- ko if: $data.app && $data.app.name -->',
                                div([
                                    div({
                                        style: {
                                            display: 'inline-block',
                                            verticalAlign: 'top'
                                        }
                                    }, [
                                        '<!-- ko if: $data.iconUrl -->',
                                        span({
                                            class: 'fa-stack',
                                            style: {
                                                textAlign: 'center',
                                                verticalAlign: 'top'
                                            }
                                        }, [
                                            img({
                                                dataBind: {
                                                    attr: {
                                                        src: '$data.iconUrl'
                                                    }
                                                },
                                                style: {
                                                    width: '20px',
                                                    height: '20px'
                                                }
                                            })
                                        ]),
                                        '<!-- /ko -->',
                                        '<!-- ko if: !$data.iconUrl -->',
                                        span({
                                            class: 'fa-stack',
                                            style: {
                                                verticalAlign: 'top'
                                            }
                                        }, [
                                            span({
                                                class: 'fa fa-square fa-stack-2x',
                                                style: {
                                                    color: 'rgb(103,58,103)'
                                                }
                                            }),
                                            span({
                                                class: 'fa fa-inverse fa-stack-1x fa-cube'
                                            })
                                        ]),
                                        '<!-- /ko -->'
                                    ]),
                                    div({
                                        style: {
                                            display: 'inline-block',
                                            style: {
                                                verticalAlign: 'top'
                                            }
                                        }
                                    }, [
                                        div({}, [
                                            a({
                                                dataBind: {
                                                    text: '$data.app.name',
                                                    attr: {
                                                        href: '"#catalog/apps/" + $data.app.id'
                                                    }
                                                },
                                                target: '_blank'
                                            })
                                        ]),
                                        div([
                                            a({
                                                dataBind: {
                                                    text: '$data.app.module',
                                                    attr: {
                                                        href: '"#catalog/modules/" + $data.app.module'
                                                    }
                                                },
                                                target: '_blank'
                                            }),
                                            '/',
                                            span({
                                                dataBind: {
                                                    text: '$data.app.method'
                                                }
                                            })
                                        ])
                                    ])
                                ]),

                                '<!-- /ko -->',
                                '<!-- ko if: ! $data.spec -->',
                                div('No information about this app'),
                                '<!-- /ko -->',


                                '<!-- /ko -->',
                                '<!-- ko if: type === "data" -->',
                                div('no preview for data cell'),
                                '<!-- /ko -->',
                                '<!-- ko if: type === "output" -->',
                                div('no preview for output cell'),
                                '<!-- /ko -->',
                                '<!-- ko if: type === "unknown" -->',
                                div('no preview for unknown cell type'),
                                '<!-- /ko -->',
                                '<!-- /ko -->'
                            ]),
                            '<!-- /ko -->'
                        ])
                    ])
                ])
            ]),
            '<!-- /ko -->',
            '<!-- /ko -->'
        ];
    }

    function templatex() {
        return div({
            class: 'component-reske-narrative-browse -row'
        }, [
            div([
                div({
                    style: {
                        display: 'inline-block',
                        verticalAlign: 'top',
                        width: '5%',
                        // textAlign: 'center',
                        // color: '#FFF',
                        // backgroundColor: '#AAA'
                    },
                    class: '-field -resultNumber'
                }, span({
                    dataBind: {
                        // text: '$index() + $component.pageStart() + 1'
                        text: 'item.meta.resultNumber'
                    }
                })),
                div({
                    style: {
                        display: 'inline-block',
                        verticalAlign: 'top',
                        width: '75%'
                    }
                }, [
                    div({
                        class: '-title'
                    }, [
                        common.buildTypeIcon(),
                        a({
                            dataBind: {
                                attr: {
                                    href: '"/narrative/" + item.meta.narrativeId'
                                },
                                text: 'item.narrative.title'
                            },
                            style: {
                                verticalAlign: 'middle',
                                marginLeft: '4px'
                            },
                            target: '_blank'
                        })
                    ]),
                    common.buildMetaInfo({
                        showNarrative: false
                    })
                ]),
                div({
                    style: {
                        display: 'inline-block',
                        verticalAlign: 'top',
                        width: '20%'
                    }
                }, div({
                    class: '-features'
                }, [
                    common.buildSharingInfo(),
                    common.buildActions({
                        dataview: false
                    })
                ]))
            ]),
            buildCellsPreview()
        ]);
    }

    function buildTypeView() {
        return table({
            class: '-table '
        }, [
            tr([
                th('Creator'),
                td({
                    // dataBind: {
                    //     text: 'item.genome.scientificName'
                    // },
                    // class: '-scientific-name'
                })
            ]),
            tr([
                th('App Cells'),
                td(
                    // [
                    //     '<!-- ko if: item.genome.taxonomy.length === 0 -->',
                    //     '-',
                    //     '<!-- /ko -->',
                    //     '<!-- ko if: item.genome.taxonomy.length > 0 -->',
                    //     div({
                    //         class: '-taxonomy',
                    //         dataBind: {
                    //             foreach: 'item.genome.taxonomy'
                    //         }
                    //     }, span([
                    //         span({
                    //             dataBind: {
                    //                 text: '$data'
                    //             }
                    //         }),
                    //         '<!-- ko if: $index() < $parent.item.genome.taxonomy.length - 1 -->',
                    //         span({
                    //             class: 'fa fa-angle-right',
                    //             style: {
                    //                 margin: '0 4px'
                    //             }
                    //         }),
                    //         '<!-- /ko -->'
                    //     ])),
                    //     '<!-- /ko -->'
                    // ]
                )
            ]),
            tr([
                th('App Cells'),
                td(
                    // [
                    //     '<!-- ko if: item.genome.taxonomy.length === 0 -->',
                    //     '-',
                    //     '<!-- /ko -->',
                    //     '<!-- ko if: item.genome.taxonomy.length > 0 -->',
                    //     div({
                    //         class: '-taxonomy',
                    //         dataBind: {
                    //             foreach: 'item.genome.taxonomy'
                    //         }
                    //     }, span([
                    //         span({
                    //             dataBind: {
                    //                 text: '$data'
                    //             }
                    //         }),
                    //         '<!-- ko if: $index() < $parent.item.genome.taxonomy.length - 1 -->',
                    //         span({
                    //             class: 'fa fa-angle-right',
                    //             style: {
                    //                 margin: '0 4px'
                    //             }
                    //         }),
                    //         '<!-- /ko -->'
                    //     ])),
                    //     '<!-- /ko -->'
                    // ]
                )
            ]),
            tr([
                th('Data Objects '),
                td(div({
                    // dataBind: {
                    //     html: 'item.genome.featureCount.formatted'
                    // },
                    // class: '-feature-count'
                }))
            ])
        ]);
    }

    function template() {
        return div({
            class: 'component-reske-narrative-browse -row'
        }, [
            div([
                div({
                    style: {
                        display: 'inline-block',
                        verticalAlign: 'top',
                        width: '5%',
                    },
                    class: '-field -resultNumber'
                }, span({
                    dataBind: {
                        text: 'item.meta.resultNumber'
                    }
                })),
                div({
                    style: {
                        display: 'inline-block',
                        verticalAlign: 'top',
                        width: '70%'
                    }
                }, [
                    div([
                        div({
                            class: '-title'
                        }, [
                            common.buildTypeIcon(),
                            a({
                                dataBind: {
                                    attr: {
                                        href: '"/narrative/" + item.meta.narrativeId'
                                    },
                                    text: 'item.narrative.title'
                                },
                                style: {
                                    verticalAlign: 'middle',
                                    marginLeft: '4px'
                                },
                                target: '_blank'
                            })
                        ])
                    ]),
                    div([
                        div({
                            style: {
                                display: 'inline-block',
                                verticalAlign: 'top',
                                width: '50%',
                                padding: '4px',
                                boxSizing: 'border-box'
                            }
                        }, buildTypeView()),
                        div({
                            style: {
                                display: 'inline-block',
                                verticalAlign: 'top',
                                width: '50%',
                                padding: '4px',
                                boxSizing: 'border-box'
                            }
                        }, common.buildMetaInfo())
                    ])
                ]),


                div({
                    style: {
                        display: 'inline-block',
                        verticalAlign: 'top',
                        width: '25%',
                        textAlign: 'right'
                    }
                }, div({
                    xclass: '-features'
                }, [
                    common.buildSharingInfo(),
                    common.buildActions({
                        dataview: false
                    })
                ]))
            ]),
            buildCellsPreview()
        ]);
    }

    function component() {
        return {
            viewModel: viewModel,
            template: template()
        };
    }

    return component;
});