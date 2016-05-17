# React Step Form

  This component is used to handle the flow between pages and allows for easy, yet controlled navigation between them.

## Installation

`npm install react-stepform`

## Usage

See example

## Properties

| Prop | Default | Type | Description |
| ---- | ------- | ---- | ----------- |
| `currentPage` | 0 | Integer | Can be set initially to be the landing page. This will also modify the current page if changed. |
| `transitionName` | step | String | Used for css transition effect with ReactCSSTransitionGroup |
| `transitionTiming` | [500, 300] | Array | Enter timeout and leave timeout for ReactCSSTransitionGroup |
| `pageOrder` | ascending | Array | Array of integers indicating order in which the pages should display |
| `onPageChange` | null | Function | Function that is fired when the page changes via any catalyst |
| `onFinish` | null | Function | Function that is fired when the last page change |
| `className` | null | String | Appended to component class list |

## Context

| Context | Type | Description |
| -------- | ---- | ----------- |
| `nextPage` | Function | Move to he next page |
| `previousPage` | Function | Move ot the previous page |
| `setPage` | Function | Move to specific page |
