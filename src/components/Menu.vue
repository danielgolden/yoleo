<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { directive } from "vue3-click-away";
import { store } from "../store";

interface Item {
  label: string;
  icon: string;
  destructive: boolean;
  onClick: () => void;
}

export default defineComponent({
  emits: ["closeMenu"],
  data() {
    return {
      destructiveItemHovered: false,
      store
    }
  },
  props: {
    items: {type: Array as PropType<Item[]>, required: true},
    classes: {type: String, required: false},
    icon: { type: String, required: false },
  },
  directives: {
    ClickAway: directive
  },
  components: {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems
  },
  methods: {
    getIconColor(destructive: boolean): string {
      if (destructive) {
        return '#9A1C1C'
      } else {
        return '#575757'
      }
    },
    handleHover(e: MouseEvent) {
      if (e.type === 'mouseover') {
        this.destructiveItemHovered = true;
      } else {
        this.destructiveItemHovered = false;
      }
    },
    handleItemClick(incomingMethod: () => void) {
      this.$emit('closeMenu');
      incomingMethod();
    },
  },
});

</script>

<template>
  <Menu :class="{'menu': true, [classes as string]: classes}">
    <MenuItems as="ul" static>
      <MenuItem
        v-for="item in items"
        :key="item.label"
        @click.stop="handleItemClick(item.onClick)"
        as="li"
        :class="{'menu-item': true, 'destructive-item': item.destructive}"
        @mouseover="(e) => { if (item.destructive) handleHover(e) }" 
        @mouseleave="(e) => { if (item.destructive) handleHover(e) }"
      >
        <Icon :name="item.icon" :color="getIconColor(item.destructive)" />
        {{ item.label }}
      </MenuItem>
    </MenuItems>
  </Menu>
</template>

<style scoped>
  .menu {
    display: flex;
    min-width: 180px;
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
    margin: 0;
    padding: 6px;
    z-index: 1000000;
    position: absolute;
    background: #FFFFFF;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.05), 0px 1px 2px rgba(0, 0, 0, 0.05);
    border-radius: 6px;
    list-style-type: none;
  }

  .menu-item {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    border-radius: 3px;
    padding: 10px;
    color: #515151;
  }

  .menu-item:hover {
    background-color: #F5F5F5;
  }

  .destructive-item {
    color: #9A1C1C;
  }

  .destructive-item:hover {
    background-color: #fff1f1;
    /* color: #fff; */
  }
</style>