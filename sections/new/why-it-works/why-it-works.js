(() => {
	const ACTIVE = 'active';
	const root = document.querySelector('.why-it-works');
	if (!root) return;

	const normalizeId = v => (v || '').replace(/^#/, '').trim() || null;

	const getTargetId = link => {
		const href = link?.getAttribute('href') || '';
		return href.startsWith('#') && href.length > 1 ? normalizeId(href) : null;
	};

	const findDetails = id => id && root.querySelector(`details#${CSS.escape(id)}`);
	const findLink = id => id && root.querySelector(`a[href="#${CSS.escape(id)}"]`);

	const setActive = id => {
		root.querySelectorAll('a[href^="#"]').forEach(a =>
			a.classList.toggle(ACTIVE, a === findLink(id))
		);
	};

	const closeOthers = current => {
		root.querySelectorAll('details').forEach(d => {
			if (d !== current) d.open = false;
		});
	};

	const toggle = id => {
		const d = findDetails(id);
		if (!d) return;

		if (d.open) {
			d.open = false;
			setActive(null);
		} else {
			closeOthers(d);
			d.open = true;
			setActive(id);
		}
	};

	root.addEventListener('click', e => {
		const link = e.target.closest('a');
		const id = getTargetId(link);
		if (!id || !findDetails(id)) return;

		e.preventDefault();
		toggle(id);
	});

	root.addEventListener('click', e => {
		const summary = e.target.closest('summary');
		if (!summary) return;

		const details = summary.parentElement;
		if (!details?.id) return;

		e.preventDefault();
		toggle(details.id);
	});

	const opened = root.querySelector('details[open][id]');
	if (opened) setActive(opened.id);
})();
