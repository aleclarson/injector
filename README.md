
# injector v1.0.0 ![locked](https://img.shields.io/badge/stability-locked-0084B6.svg?style=flat)

```coffee
Injector = require "injector"

# The injector is cached by its unique id.
MyInjector = Injector "MyClass"

MyInjector.set "foo", 420
MyInjector.get "foo" # => 420

MyInjector.push "bar", yes
MyInjector.get "bar" # => yes

MyInjector.push "bar", no
MyInjector.get "bar" # => no

MyInjector.pop "bar"
MyInjector.get "bar" # => yes

MyInjector.set "func", (a) -> a + 1
MyInjector.call "func", 2 # => 3
```
