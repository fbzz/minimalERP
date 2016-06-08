<?php
if (PHP_SAPI == 'cli-server') {
    // To help the built-in PHP dev server, check if the request was actually for
    // something which should probably be served as a static file
    $file = __DIR__ . $_SERVER['REQUEST_URI'];
    if (is_file($file)) {
        return false;
    }
}

require __DIR__ . '/../vendor/autoload.php';

session_start();

// Instantiate the app
$settings = require __DIR__ . '/../src/settings.php';
$app = new \Slim\App($settings);

// Set up dependencies
require __DIR__ . '/../src/dependencies.php';

require __DIR__. '/../src/userVO.php';

//require __DIR__. '/../src/functions.php';

require __DIR__. '/../src/dao.php';

//require __DIR__. '/../src/teste.php';

// Register middleware
require __DIR__ . '/../src/middleware.php';

// Register routes
require __DIR__ . '/../src/routes.php';




$app->get('/login/{user}/{password}', function ($request, $response, $arg) use ($app) {


$dao = new dao();
$teste = $dao->checkUser($arg['user'],$arg['password']);
print_r($teste);
});

$app->get('/all/movies', function ($request, $response, $arg){
$dao = new dao();
$teste = $dao->getMovies();
return $teste;
});

$app->get('/all/querys', function ($request, $response, $arg){
$dao = new dao();
$teste = $dao->getQuerys($arg['logon']);
return $teste;
});
// Run app

$app->get('/all/{query}', function ($request, $response, $arg){
$dao = new dao();

 return $dao->executeCustomQuery($arg['query']);
});	

$app->get('/alls/cols', function ($request, $response, $arg){
$dao = new dao();
$teste = $dao->getAllNewCol();
return $teste;
});
$app->get('/all/admin/services/{query}', function ($request, $response, $arg){
$dao = new dao();
return $dao->executeCustomQueryAdmin($arg['query']);
});
$app->get('/all/getQuerys/{logon}', function ($request, $response, $arg){
$dao = new dao();
return $dao->getQuerys($arg['logon']);
});
$app->get('/all/{query}/{logon}', function ($request, $response, $arg){
$dao = new dao();
return $dao->insertQuery($arg['logon'], $arg['query']);
});
$app->run();

