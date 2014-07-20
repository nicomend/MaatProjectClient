

function Toolbar($scope, $location)
{
	var actionsPackage = "html/toolbar/actions/";
	var htmlSuffix = ".html";
	
	$scope.getActionTemplateURL = function()
	{
		if ($scope.selectedAction == null)
		{
			return null;
		}
		return actionsPackage + "template/" + $scope.selectedAction + htmlSuffix;
	}
	
	$scope.getSpecificForm = function()
	{
		if ($scope.selectedAction == null)
		{
			return null;
		}
		return actionsPackage + $location.path() + "/" + $scope.selectedAction + htmlSuffix;
	}
	
	$scope.toggleAction = function(action)
	{
		if ($scope.selectedAction == action)
		{
			$scope.selectedAction = null;
		}
		else
		{
			$scope.selectedAction = action; 
		}
		
		$scope.clearFields();
	}
}