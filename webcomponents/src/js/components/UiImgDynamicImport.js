'use strict'

export default class UiImgDynamicImport extends HTMLElement {
  constructor () {
    super()
  }

  static get template () {
    return `
      <style>
        :host img {
          opacity: 0;
        }
      </style>

      <img src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==">
    `
  }

  connectedCallback () {
    this.attachShadow({
      mode: 'open'
    }).innerHTML = UiImgDynamicImport.template
  }
}
