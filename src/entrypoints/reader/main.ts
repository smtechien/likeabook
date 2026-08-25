import { mount } from 'svelte';
import ReaderApp from './App.svelte';

const target = document.getElementById('app');

if (target) {
  mount(ReaderApp, { target });
}
