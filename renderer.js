/** @jsx h */

// ^^^^ this tells a transpiler to inject calls to an `h()` function for each node.

const ITEMS = 'hello there people'.split(' ');


function foo(items) {
	
	return items.map( p => <li> {p} </li> );
}


let vdom = (
	<div id="foo">
		<p>Look, a simple JSX DOM renderer!</p>
		<ul>{ foo(ITEMS) }</ul>
	</div>
);


let dom = render(vdom);


document.body.appendChild(dom);


let json = JSON.stringify(vdom, null, '  ');


document.body.appendChild(
	render( <pre>{ json }</pre> )
);




function render(vnode) {
	if (typeof vnode==='string') return document.createTextNode(vnode);
	let n = document.createElement(vnode.nodeName);
	Object.keys(vnode.attributes || {}).forEach( k => n.setAttribute(k, vnode.attributes[k]) );
	(vnode.children || []).forEach( c => n.appendChild(render(c)) );
	return n;
}


function h(nodeName, attributes, ...args) {
	let children = args.length ? [].concat(...args) : null;
	return { nodeName, attributes, children };
}


/*
// here's an alternative hyperscript-to-vdom method that creates sparse nodes:
function h(nodeName, attributes, ...args) {
	let vnode = { nodeName };
	if (attributes) vnode.attributes = attributes;
	if (args.length) vnode.children = [].concat(...args);
    return vnode;
}
*/
