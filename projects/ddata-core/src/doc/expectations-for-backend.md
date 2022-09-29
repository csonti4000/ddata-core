# Expectetions for backend

This package built for Laravel backend applications, but the package has some extra expectations over the basic
operation of Laravel.

Of course your backend can be written in any languages, or any frameworks. This package can work with if the backend satisfy the package's needs.

## API endpoints

You MUST define in your backend these API endpoints:

| RemoteDataService method | URI                    | HTTP Method | Response type           |
|--------------------------|------------------------|-------------|-------------------------|
| getAll()                 | `user/`                | `GET`       | JSON, PaginateInterface |
| getAllWithoutPaginate()  | `user/list`            | `GET`       | JSON, array             |
| getPage()                | `user/?page={n}`       | `GET`       | JSON, PaginateInterface |
| getOne()                 | `user/{id}`            | `GET`       | JSON, object            |
| save() (create)          | `user/create`          | `POST`      | JSON, `{"id": 1}`       |
| save() (update)          | `user/{id}`            | `PUT`       | JSON, `{"id": 1}`       |
| delete()                 | `user/`                | `DELETE`    | HTTP Response OK        |
| deleteMultiple()         | `user/multiple/delete` | `POST`      | JSON, object            |


## Implement in Laravel 6.x

In your `ResourceRegister.php` file define these as minimum. Be careful, becasue this list of resource defaults
are less than Laravel's default - but my package use only these endpoints.

```php
    protected $resourceDefaults = [
        'destroy',
        'index',
        'list',
        'multipleDelete',
        'show',
        'store',
        'update',
    ];

    /**
     * Add the data method for a resourceful route.
     *
     * @param  string  $name
     * @param  string  $base
     * @param  string  $controller
     * @param  array   $options
     * @return \Illuminate\Routing\Route
     */
    protected function addResourceList($name, $base, $controller, $options) {
        $uri = $this->getResourceUri($name).'/list';
        $action = $this->getResourceAction($name, $controller, 'all', $options);

        return $this->router->get($uri, $action);
    }

    /**
     * Add the data method for a resourceful route.
     *
     * @param  string  $name
     * @param  string  $base
     * @param  string  $controller
     * @param  array   $options
     * @return \Illuminate\Routing\Route
     */
    protected function addResourceMultipleDelete($name, $base, $controller, $options)
    {
        $uri = $this->getResourceUri($name).'/multiple/delete';
        $action = $this->getResourceAction($name, $controller, 'multipleDelete', $options);

        return $this->router->post($uri, $action);
    }
```

I use `all()` and `multipleDelete()` function names in my controllers, but feel free to use your custom name.

