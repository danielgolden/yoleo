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
  emits: ["closePopover"],
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
      if (this.destructiveItemHovered && destructive) {
        return '#fff'
      } else if (destructive) {
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
      this.$emit('closePopover');
      incomingMethod();
    },
  },
});

</script>

<template>
  <Menu :class="{'popover': true, [classes as string]: classes}">
    <MenuItems as="ul" static>
      <MenuItem
        v-for="item in items"
        :key="item.label"
        @click.stop="handleItemClick(item.onClick)"
        as="li"
        :class="{'popover-item': true, 'destructive-item': item.destructive}"
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
  .popover {
    display: flex;
    min-width: 180px;
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
    margin: 0;
    padding: 8px;
    z-index: 1000000;
    position: absolute;
    background: #FFFFFF;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.05), 0px 1px 2px rgba(0, 0, 0, 0.05);
    border-radius: 6px;
    list-style-type: none;
  }

  .popover-item {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    border-radius: 2.75px;
    padding: 8px;
    color: #515151;
  }

  .popover-item:hover {
    background-color: #F5F5F5;
  }

  .destructive-item {
    color: #9A1C1C;
  }

  .destructive-item:hover {
    background-color: #9A1C1C;
    color: #fff;
  }
</style>
