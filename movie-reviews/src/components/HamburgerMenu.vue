<template>
    <div id="burger" :class="{
        'active': active
    }" @click="toggleActive">
        <button type="button" class="burger-button" title="Menu">
            <span class="burger-bar burger-bar--1"></span>
            <span class="burger-bar burger-bar--2"></span>
            <span class="burger-bar burger-bar--3"></span>
        </button>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Burger extends Vue {
    @Prop() active!: boolean

    toggleActive(): void {
        this.$emit('toggle-menu')
    }
  
}
</script>

<style scoped lang="scss">
$burger-color: #444;
$primary: #2b2b68;

.hidden {
    visibility: hidden;
}

button {
    cursor: pointer;
}

/* remove blue outline */
button:focus {
    outline: 0;
}

.burger-button {
    position: relative;
    height: 30px;
    width: 40px;
    display: block;
    z-index: 99;
    border: 0;
    border-radius: 0;
    background-color: transparent;
    pointer-events: all;
    transition: transform .6s cubic-bezier(.165, .84, .44, 1);
}

.burger-bar {
    background-color: $burger-color;
    position: absolute;
    top: 50%;
    right: 6px;
    left: 6px;
    height: 3px;
    width: auto;
    margin-top: -1px;
    transition: transform .6s cubic-bezier(.165, .84, .44, 1), opacity .3s cubic-bezier(.165, .84, .44, 1), background-color .6s cubic-bezier(.165, .84, .44, 1);
}

.burger-bar--1 {
    -webkit-transform: translateY(-6px);
    transform: translateY(-6px);
    top: 40%;
}

.burger-bar--2 {
    transform-origin: 100% 50%;
    transform: scaleX(1);
}

.burger-button:hover .burger-bar--2 {
    transform: scaleX(1);
}

.no-touchevents .burger-bar--2:hover {
    transform: scaleX(1);
}

.burger-bar--3 {
    transform: translateY(6px);
    top: 60%;
}

#burger.active .burger-button {
    transform: rotate(-180deg);
}

#burger.active .burger-bar {
    background-color: lighten($primary, 10);
}

#burger.active .burger-bar--1 {
    transform: rotate(45deg);
    top: 50%;
}

#burger.active .burger-bar--2 {
    opacity: 0;
}

#burger.active .burger-bar--3 {
    transform: rotate(-45deg);
    top: 50%;
}

@media screen and (max-width: 991px) {
    #burger {
        display: block;
    }
}
</style>