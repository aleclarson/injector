
NamedFunction = require "NamedFunction"
setType = require "setType"

module.exports =
Injector = NamedFunction "Injector", (id) ->

  cache = Injector.cache

  injector = cache[id]
  return injector if injector

  injector = {
    id
    values: Object.create null
    stacks: undefined
  }

  cache[id] = setType injector, Injector

Injector.cache = Object.create null

Injector::get = (key) ->
  @values[key]

Injector::set = (key, value) ->
  @values[key] = value
  return

Injector::push = (key, value) ->
  return if value is undefined
  oldValue = @values[key]
  if oldValue isnt undefined
    if @stacks then stack = @stacks[key]
    else @stacks = Object.create null
    if stack then stack.push oldValue
    else @stacks[key] = [ oldValue ]
  @values[key] = value
  return

Injector::pop = (key) ->
  return if @values[key] is undefined
  stack = @stacks[key] if @stacks
  @values[key] = if stack then stack.pop() else undefined
  return

Injector::call = ->
  key = Array::shift.call arguments
  func = @values[key]
  unless func and func.call
    throw TypeError "Must inject a Function into '#{@id}.#{key}'!"
  return func.apply null, arguments
