"use strict";

(function() {
	/* Cache the Modal DOM for faster manipulation. */
	let modalDOM = document.querySelector('#modalWrapper');
	let Modal = function() {
		this.type = null;
		this.content = null;
		this.DOM = null;
	}
	Modal.prototype.init = function(type) {
		this.type = type;
		this.DOM = modalDOM;
	}
	Modal.prototype._prepare = function(params = null) {
		if (this.type === '_Win') {
			/* Winning popup. */
			let mainContent = document.createElement('div');
			mainContent.classList.add('modal-content', 'flex', 'justify-content-center', 'align-items-center');
			mainContent.setAttribute('id', this.type);
			mainContent.innerHTML = '<h5>Congratulations! ' + params.name + '. You have won.</h5>';
			
			return mainContent;

		} else if (this.type === '_Stats') {
			/* Player stats popup. */

		} else if (this.type === '_Invalid') {
			/* Invalid move popup. */

		} else if (this.type === '_Reset') {
			/* Reset board popup. */

		} else {
			alert('Invalid modal type!');
		}
	}
	Modal.prototype._setContent = function(params = null) {
		this.content = this._prepare(params);
		let modal = this.DOM.querySelector('#modal');
		modal.appendChild(this.content);
		modal.querySelector('#btnClose').onclick = this.off.bind(this);
	}
	Modal.prototype._removeContent = function() {
		let modal = this.DOM.querySelector('#modal');
		modal.removeChild(this.content);
	}
	Modal.prototype.edit = function() {

	}
	Modal.prototype.on = function(params = null) {
		this._setContent(params);
		this.DOM.style.display = 'flex';
	}
	Modal.prototype.off = function() {
		this._removeContent();
		this.DOM.style.display = 'none';
	}

	let winPopup = new Modal();
	// winPopup.init('_Win');
	// winPopup.on({name: 'Rahul'});
})();