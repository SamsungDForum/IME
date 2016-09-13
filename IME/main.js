(function () {
    'use strict';

    var isImeFocused = false;

    /**
     * Displays logging information on the screen and in the console.
     * @param {string} msg - Message to log.
     */
    function log(msg) {
        var logsEl = document.getElementById('logs');

        if (msg) {
            // Update logs
            console.log('[IME]: ', msg);
            logsEl.innerHTML += msg + '<br />';
        } else {
            // Clear logs
            logsEl.innerHTML = '';
        }

        logsEl.scrollTop = logsEl.scrollHeight;
    }

    /**
     * Register keys used in this application
     */
    function registerKeys() {
        var usedKeys = ['0', 'ChannelUp', 'ChannelDown'];

        usedKeys.forEach(
            function (keyName) {
                tizen.tvinputdevice.registerKey(keyName);
            }
        );
    }


    /**
     * Handle input from remote
     */
    function registerKeyHandler() {
        document.addEventListener('keydown', function (e) {
            switch (e.keyCode) {
                //key 0
                case 48:
                    log();
                    break;
                //key 1
                case 427:
                    showIme();
                    break;
                case 428: //key 2
                case 65376: //key done
                case 65385: //key cancel
                    hideIme();
                    break;
                //key return
                case 10009:
                    //make sure we don't exit the application with IME shown!
                    if (!isImeFocused) {
                        tizen.application.getCurrentApplication().exit();
                    }
                    break;
            }
        });
    }

    /**
     * Display application version
     */
    function displayVersion() {
        var el = document.createElement('div');
        el.id = 'version';
        el.innerHTML = 'ver: ' + tizen.application.getAppInfo().version;
        document.body.appendChild(el);
    }

    /**
     * show ime and focus inpute element
     */
    function showIme() {
        var elIme = document.querySelector('#ime-tizen');
        log('Show ime');
        elIme.focus();
        isImeFocused = true;
    }

    /**
     * hide IME and blur input element and focus body
     */
    function hideIme() {
        var elIme = document.querySelector('#ime-tizen');
        log('Hide ime');
        document.body.focus();
        elIme.blur();
        isImeFocused = false;
    }

    /**
     *  handle event keyup
     * @param {object} data
     */
    function changeIme(data) {
        log('IME data: ' + data.target.value);
    }

    /**
     * Start the application once loading is finished
     */
    window.onload = function () {
        var elIme;

        if (window.tizen === undefined) {
            log('This application needs to be run on Tizen device');
            return;
        }

        displayVersion();
        registerKeys();
        registerKeyHandler();

        elIme = document.querySelector('#ime-tizen');

        //This is how we handle input from IME
        elIme.addEventListener('input', changeIme);

        //This is how we handle end of IME composition
        elIme.addEventListener('compositionend', function () {
            log('compositionend');
        });

    };
})();