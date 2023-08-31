<script>import { flip } from "svelte/animate";
import { createEventDispatcher } from "svelte";
export let ulStyle = "";
export let liStyle = "";
export let list;
let isOver = false;
const dispatch = createEventDispatcher();
function getDraggedParent(node) {
  if (!node.dataset.index) {
    return getDraggedParent(node.parentNode);
  } else {
    return { ...node.dataset };
  }
}
function onDragStart(e) {
  const dragged = getDraggedParent(e.target);
  e.dataTransfer?.setData("source", dragged?.index.toString());
}
function onDragOver(e) {
  const id = e.target.dataset?.id;
  const dragged = getDraggedParent(e.target);
  isOver = dragged?.id ?? false;
}
function onDragLeave(e) {
  const dragged = getDraggedParent(e.target);
  isOver === dragged.id && (isOver = false);
}
function onDrop(e) {
  isOver = false;
  const dragged = getDraggedParent(e.target);
  reorder({
    from: e.dataTransfer?.getData("source"),
    to: dragged.index
  });
}
const reorder = ({ from, to }) => {
  const newList = [...list];
  newList[from] = [newList[to], newList[to] = newList[from]][0];
  dispatch("reSort", newList);
};
</script>
  
  {#if list?.length}
    <ul class={ulStyle}>
      {#each list as item, index (index)}
        <li
          class={liStyle}
          class:over={item.id === isOver}
          data-index={index}
          data-id={item.id}
          draggable="true"
          on:dragstart={onDragStart}
          on:dragover|preventDefault={onDragOver}
          on:dragleave={onDragLeave}
          on:drop|preventDefault={onDrop}
          animate:flip={{ duration: 300 }}
        >
          <slot {item} {index} />
        </li>
      {/each}
    </ul>
  {:else}
    <p class="text-center my-12 text-lg font-bold">No items</p>
  {/if}
  
  <style>
    .over {
      @apply border-gray-400 scale-105;
    }
  </style>