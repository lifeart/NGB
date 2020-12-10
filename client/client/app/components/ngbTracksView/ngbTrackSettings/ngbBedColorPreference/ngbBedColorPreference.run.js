import controller from './ngbBedColorPreference.controller';

export default function run($mdDialog, dispatcher) {
    const displayBedColorSettingsCallback = ({ config, sources }) => {
        if ((sources || []).length > 0) {
            $mdDialog.show({
                clickOutsideToClose: true,
                controller: controller.UID,
                controllerAs: 'ctrl',
                locals: {
                    defaults: config.defaults,
                    settings: config.settings,
                    sources,
                },
                template: require('./ngbBedColorPreference.dialog.tpl.html'),
            });
        }
    };

    dispatcher.on('bed:color:configure', displayBedColorSettingsCallback);
}
