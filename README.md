# Svelte Drag Drop

An easy-to-use drag and drop Svelte component

## Demo
A demo of this component can be seen [here](https://svelte.dev/repl/b1154f804b1f4794947da7795add613c?version=4.2.0)

## Installation

Install sveltedragdrop with npm

```bash
  npm i sveltedragdrop
```

### Required attributes

- list
  (List of things)
- on:reSort
  (Resort logic)
- let:item

### Styling attributes (optional)

You can easily style the component as you want by passing styling classes as string into attributes below.
( The classes can be from any framework or library or even your own global styles as long as the component can access them. )

- ulStyle
- liStyle

## Usage/Examples

```HTML
<!--app.html-->
...
<style>
    .big-black-text{
        font-weight: 900;
	color: red;
	font-size: 10em;
    }
</style>
```

```javascript
<script>
    import DragDrop from "sveltedragdrop"
    let people = [
        { name: "Robert Downey" },
        { name: "Chris Evans" },
        { name: "Chris Hemsworth" },
        { name: "Chadwick Boseman" },
        { name: "Chris Pratt" }
    ]
    function reSortHandler(e) {
        let newList = e.detail
        people = newList
    }
</script>

<div>
    <DragDrop
    let:item
    list={people}
    on:reSort={reSortHandler}
    ulStyle="flex"
    liStyle="big-black-text"
    >
    <h2>{item.name}</h2>
    </DragDrop>
</div>
```


## Authors

- [@DanielHo/Canadies](https://github.com/Hai567)
- An other sources on the Internet (of course :D)
