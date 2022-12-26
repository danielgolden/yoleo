<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { directive } from "vue3-click-away";
import { store } from "../store";

interface Item {
  label: string;
  icon: string;
  destructive: boolean;
  heading: boolean;
  separator: boolean;
  active: boolean;
  switch: boolean;
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
    settingsMenu: { type: Boolean, required: false }
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
        return 'var(--color-text-destructive)'
      } else {
        return 'var(--color-text-primary)'
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
  <Menu :class="{ 'menu': true, 'settings-menu': settingsMenu, [classes as string]: classes}" data-testid="contextMenu">
    <MenuItems as="ul" static>
      <MenuItem
        v-for="item in items"
        :key="item.label"
        @click.stop="handleItemClick(item.onClick)"
        :as="item.separator ? 'hr' : 'li'"
        :class="{
          'menu-item': true, 
          'destructive-item': item.destructive,
          'heading-menu-item': item.heading
        }"
        @mouseover="(e) => { if (item.destructive) handleHover(e) }" 
        @mouseleave="(e) => { if (item.destructive) handleHover(e) }"
      >
        <Icon v-if="item.icon" :opacity="settingsMenu && '.5'" :name="item.icon" :color="getIconColor(item.destructive)" />
        {{ item.label }}
        <Icon v-if="item.active" name="check" color="var(--color-text-interactive)" />
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
    background: var(--color-bg-surface-3);
    box-shadow: 0px 5px 10px var(--color-box-shadow), 0px 1px 2px var(--color-box-shadow);
    border-radius: 6px;
    list-style-type: none;
  }
  
  .settings-menu {
    min-width: 200px;
  }

  .menu-item {
    display: flex;
    gap: 8px;
    width: 100%;
    border-radius: 3px;
    padding: 10px;
    font-size: 14px;
    color: var(--color-text-secondary);
    cursor: pointer;
  }

  .settings-menu .menu-item {
    display: grid;
    grid-template-columns: 22px 1fr auto;
    align-items: center;
  }

  .menu-item:hover {
    background-color: var(--color-bg-control-hover);
  }

  .settings-menu .heading-menu-item {
    display: flex;
    cursor: default;
    padding-bottom: 8px;
    font-weight: 600;
    color: var(--color-text-primary);
  }

  hr.menu-item {
    width: calc(100% - 18px);
    border: none;
    height: 1px;
    padding: 0;
    background-color: var(--color-border-secondary);
  }

  .heading-menu-item:hover {
    background-color: transparent;
  }

  .destructive-item {
    color: var(--color-text-destructive);
  }

  .destructive-item:hover {
    background-color: var(--color-bg-control-destructive-hover);
  }
</style>
