app.controller('project', async function ($scope, $sce, $uibModal) {
    $scope.project = await goodidea.Project.getProjectById(queryString['id']);
    $scope.project.contentSegments = $scope.project.getContentSegments().segments;
    $scope.$apply();

});