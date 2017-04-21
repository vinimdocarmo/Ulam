/**
 * Created by vinimdocarmo on 20/04/17.
 */

(function () {
    'use strict';

    const cell = '<td class="cell"></td>';
    const $tbody = $('table > tbody');
    const gliderConfiguration = [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ];

    writeGliderConfiguration(gliderConfiguration);

    var previousConfiguration = gliderConfiguration;

    setInterval(() => {
        const nextConfiguration = buildNewGeneration(previousConfiguration);
        writeGliderConfiguration(nextConfiguration);
        previousConfiguration = nextConfiguration;
    }, 300);

    function writeGliderConfiguration(configuration) {
        var $tr;

        $tbody.html('');
        configuration.forEach(function (row) {
            $tr = $('<tr>');

            row.forEach(function (cell) {
                var $cell = $('<td>').addClass('cell');

                switch(cell) {
                    case 1:
                        $cell.addClass('live');
                        break;
                    case 0:
                        $cell.addClass('dead');
                        break;
                }
                $tr.append($cell);
            });
            $tbody.append($tr);
        });
    }

    function buildNewGeneration(prevConfig) {
        var newConfiguration = new Array(prevConfig.length);

        prevConfig.forEach(function (row, i) {
            newConfiguration[i] = new Array(row.length);
            row.forEach(function (cell, j) {
                var north;
                var south;
                var west;
                var east;
                var northWest;
                var northEast;
                var southWest;
                var southEast;

                if (i === 0) {
                    north = prevConfig[prevConfig.length - 1][j];
                } else {
                    north = prevConfig[i - 1][j];
                }

                if (i === prevConfig.length - 1) {
                    south = prevConfig[0][j];
                } else {
                    south = prevConfig[i + 1][j];
                }

                if (j === 0) {
                    west = prevConfig[i][row.length - 1];
                } else {
                    west = prevConfig[i][j - 1];
                }

                if (j === row.length - 1) {
                    east = prevConfig[i][0];
                } else {
                    east = prevConfig[i][j + 1];
                }

                if (i === 0) {
                    if (j === 0) {
                        northWest = prevConfig[prevConfig.length - 1][row.length - 1];
                    } else {
                        northWest = prevConfig[prevConfig.length - 1][j - 1];
                    }
                } else {
                    if (j === 0) {
                        northWest = prevConfig[i - 1][row.length - 1];
                    } else {
                        northWest = prevConfig[i - 1][j - 1];
                    }
                }

                if (i === 0) {
                    if (j === row.length -1) {
                        northEast = prevConfig[prevConfig.length - 1][0];
                    } else {
                        northEast = prevConfig[prevConfig.length - 1][j + 1];
                    }
                } else {
                    if (j === row.length -1) {
                        northEast = prevConfig[i - 1][0];
                    } else {
                        northEast = prevConfig[i - 1][j + 1];
                    }
                }

                if (i === prevConfig.length - 1) {
                    if (j === 0) {
                        southWest = prevConfig[0][row.length - 1];
                    } else {
                        southWest = prevConfig[0][j - 1];
                    }
                } else {
                    if (j === 0) {
                        southWest = prevConfig[i + 1][row.length - 1];
                    } else {
                        southWest = prevConfig[i + 1][j - 1];
                    }
                }

                if (i === prevConfig.length - 1) {
                    if (j === row.length - 1) {
                        southEast = prevConfig[0][0];
                    } else {
                        southEast = prevConfig[0][j + 1];
                    }
                } else {
                    if (j === row.length - 1) {
                        southEast = prevConfig[i + 1][0];
                    } else {
                        southEast = prevConfig[i + 1][j + 1];
                    }
                }

                var neighbors = [north, south, west, east, northWest, northEast, southWest, southEast];

                var count = _.countBy(neighbors, function(state) {
                    return state === 0 ? 'dead': 'live';
                });

                newConfiguration[i][j] = 0;

                if (prevConfig[i][j] === 0 && count.live === 3) {
                    newConfiguration[i][j] = 1;
                }

                if (prevConfig[i][j] === 1 && count.live === 2 || count.live === 3) {
                    newConfiguration[i][j] = 1;
                }

                if (prevConfig[i][j] === 1 && count.live < 2) {
                    newConfiguration[i][j] = 0;
                }

                if (prevConfig[i][j] === 0 && count.live < 3) {
                    newConfiguration[i][j] = 0;
                }

                if (count.live > 3) {
                    newConfiguration[i][j] = 0;
                }
            });
        });

        return newConfiguration;
    }
})();
