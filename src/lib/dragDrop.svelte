<script lang="ts">
    import { flip } from "svelte/animate";
    import { createEventDispatcher } from "svelte";
  
    export let ulStyle = ""
    export let liStyle = ""
    
    export let list: any[];
    let isOver: string | boolean = false;
  
    const dispatch = createEventDispatcher();
  
  
    function getDraggedParent(node: any) {
      if (!node.dataset.index) {
        return getDraggedParent(node.parentNode);
      } else {
        return { ...node.dataset };
      }
    }
  
    function onDragStart(e: DragEvent) {
      // @ts-ignore
      const dragged = getDraggedParent(e.target);
      e.dataTransfer?.setData("source", dragged?.index.toString());
    }
  
    function onDragOver(e: DragEvent) {
      // @ts-ignore
      const id = e.target.dataset?.id;
      const dragged = getDraggedParent(e.target);
      isOver = dragged?.id ?? false;
    }
  
    function onDragLeave(e: DragEvent) {
      const dragged = getDraggedParent(e.target);
      isOver === dragged.id && (isOver = false);
    }
  
    function onDrop(e: DragEvent) {
      isOver = false;
      const dragged = getDraggedParent(e.target);
      reorder({
        from: e.dataTransfer?.getData("source"),
        to: dragged.index,
      });
    }
  
    const reorder = ({ from, to }: any) => {
      const newList = [...list];
      newList[from] = [newList[to], (newList[to] = newList[from])][0];
  
      dispatch("sort", newList);
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