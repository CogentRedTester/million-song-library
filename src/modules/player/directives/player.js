import playerTemplate from "../templates/player.html";

/**
 * player directive controller
 * @param {$rootScope.Scope} $scope
 * @param {player} player
 */
function playerController ($scope, player) {
  "ngInject";

  /**
   * listener for player sate change
   * this is not angular action so we need to digest scope manually
   */
  var onPlayerStateChange = () => {
    this.active = player.isActive();
    this.songEntity = player.getSongEntity();
    $scope.$evalAsync();
  };

  /**
   * close player user action
   */
  this.close = () => player.stop();

  // add player state change listener
  player.addStateChangeListener(onPlayerStateChange);
  // when scope destroys then remove player state change listener
  $scope.$on("$destroy", () => player.removeStateChangeListener(onPlayerStateChange));
}

function playerDirective () {
  "ngInject";

  return {
    restrict: "E",
    template: playerTemplate,
    controller: playerController,
    controllerAs: "player"
  };
}

export default playerDirective;
