/**
 * Created by vinimdocarmo on 20/04/17.
 */

(function () {
    'use strict';


    const numberOfCells = 100;
    const numberOfIterations = 100;
    const initialConfiguration = randomInitialConfiguration();

    writeInitialConfiguration(initialConfiguration);

    var count = 0;
    var previousConfiguration = initialConfiguration;

    const interval = setInterval(() => {
        const nextConfiguration = buildNextGeneration(previousConfiguration);

        writeNewGeneration(nextConfiguration);

        previousConfiguration = nextConfiguration;

        count++;
        if (count === numberOfIterations) clearInterval(interval);
    }, 100);

    function buildNextGeneration(prevConfig) {
        const newConfiguration = new Array(numberOfCells);

        var prevCell, currCell, nextCell;

        for (let i = 0, len = prevConfig.length; i < len; i++) {
            currCell = prevConfig[i];

            if (i === 0) {
                prevCell = prevConfig[len - 1];
                nextCell = prevConfig[i + 1];
            } else if (i === len - 1) {
                prevCell = prevConfig[i - 1];
                nextCell = prevConfig[0];
            } else {
                prevCell = prevConfig[i - 1];
                nextCell = prevConfig[i + 1];
            }

            if (isDead(prevCell) && isDead(currCell) && isDead(nextCell)) {
                newConfiguration[i] = 0;
            } else if (isDead(prevCell) && isDead(currCell) && isLive(nextCell)) {
                newConfiguration[i] = 1;
            } else if (isDead(prevCell) && isLive(currCell) && isDead(nextCell)) {
                newConfiguration[i] = 1;
            } else if (isDead(prevCell) && isLive(currCell) && isLive(nextCell)) {
                newConfiguration[i] = 1;
            } else if (isLive(prevCell) && isDead(currCell) && isDead(nextCell)) {
                newConfiguration[i] = 0;
            } else if (isLive(prevCell) && isDead(currCell) && isLive(nextCell)) {
                newConfiguration[i] = 1;
            }  else if (isLive(prevCell) && isLive(currCell) && isDead(nextCell)) {
                newConfiguration[i] = 1;
            }  else if (isLive(prevCell) && isLive(currCell) && isLive(nextCell)) {
                newConfiguration[i] = 0;
            }
        }

        return newConfiguration;

        function isLive(cell) {
            return cell === 1;
        }

        function isDead(cell) {
            return cell === 0;
        }
    }

    function writeInitialConfiguration(initialConfiguration) {
        appendGeneration(initialConfiguration);
    }

    function randomInitialConfiguration() {
        const cells = new Array(numberOfCells);

        for (let i = 0; i < numberOfCells; i++) {
            cells[i] = _.random(0, 1);
        }

        return cells;
    }

    function writeNewGeneration(configuration) {
        appendGeneration(configuration);
    }

    function appendGeneration(configuration) {
        const $tbody = $('table > tbody');

        var $tr = $('<tr>');

        configuration.forEach((cell) => {
            const $td = $('<td>').addClass('cell');

            switch (cell) {
                case 1:
                    $td.addClass('live');
                    break;
                case 0:
                    $td.addClass('dead');
                    break;
            }

            $tr.append($td);
        });

        $tbody.append($tr);
    }

})();
