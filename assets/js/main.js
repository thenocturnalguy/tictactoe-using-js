"use strict";

let modal = (function() {
	/* Cache the Modal DOM for faster manipulation. */
	let modalDOM = document.querySelector('#modalWrapper');
	let _Modal = function() {
		this.type = null;
		this.content = null;
		this.DOM = null;
	}
	_Modal.prototype.init = function(type) {
		this.type = type;
		this.DOM = modalDOM;
	}
	_Modal.prototype._prepare = function(params = {}) {
		if (this.type === '_Win') {
			/* Winning popup. */
			let mainContent = document.createElement('div');
			mainContent.classList.add('modal-content', 'flex', 'justify-content-center', 'align-items-center');
			mainContent.setAttribute('id', this.type);
			mainContent.innerHTML = '<h5>Congratulations! ' + params.name + '. You have won.</h5>';
			
			return mainContent;

		} else if (this.type === '_Stats') {
			/* Player stats popup. */
			let mainContent = document.createElement('div');
			mainContent.classList.add('modal-content', 'flex', 'justify-content-center', 'align-items-center');
			mainContent.setAttribute('id', this.type);
			mainContent.innerHTML = '<h5>Player stats coming soon!</h5>';
			
			return mainContent;

		} else if (this.type === '_Invalid') {
			/* Invalid move popup. */
			let mainContent = document.createElement('div');
			mainContent.classList.add('modal-content', 'flex', 'justify-content-center', 'align-items-center');
			mainContent.setAttribute('id', this.type);
			mainContent.innerHTML = '<h5>Invalid move! Please check.</h5>';
			
			return mainContent;

		} else if (this.type === '_Reset') {
			/* Reset board popup. */
			let mainContent = document.createElement('div');
			mainContent.classList.add('modal-content', 'flex', 'justify-content-center', 'align-items-center');
			mainContent.setAttribute('id', this.type);
			mainContent.innerHTML = '<h5>Board reset successfully!</h5>';
			
			return mainContent;

		} else {
			alert('Invalid modal type!');
		}
	}
	_Modal.prototype._setContent = function(params = {}) {
		this.content = this._prepare(params);
		let mdl = this.DOM.querySelector('#modal');
		mdl.appendChild(this.content);
		mdl.querySelector('#btnClose').onclick = this.off.bind(this);
	}
	_Modal.prototype._removeContent = function() {
		let modal = this.DOM.querySelector('#modal');
		modal.removeChild(this.content);
	}
	_Modal.prototype.edit = function() {

	}
	_Modal.prototype.on = function(params = {}) {
		this._setContent(params);
		this.DOM.style.display = 'flex';
	}
	_Modal.prototype.off = function() {
		this._removeContent();
		this.DOM.style.display = 'none';
	}

	let popup = new _Modal();

	return {
		init: type => popup.init(type),
		on: (params = {}) => popup.on(params),
		off: () => popup.off(),
		edit: () => popup.edit()
	}
})();
