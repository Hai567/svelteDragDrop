<script>
    import "../app.css"
    import DragDrop from "$lib/components/dragDrop.svelte";
    let people = [
        {name: "Hai"},
        {name: "Daniel"},
        {name: "Anna"},
        {name: "John"},
        {name: "Jones"},
    ]
    function sortList(e) {
      const newList = e.detail;
      people = newList
    }
</script>

<DragDrop ulStyle="" liStyle="" list={people} let:item on:sort={(e) => sortList(e)}>
  <h2>{item.name}</h2>
</DragDrop>