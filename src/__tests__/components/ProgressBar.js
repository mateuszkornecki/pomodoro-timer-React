import React from 'react';
import ReactDOM from 'react-dom';
import ProgressBar from '../../components/ProgressBar';
import TestRenderer from 'react-test-renderer'; // ES6


var root = null;
var progressRenderer = null;

beforeEach(() => {
    root = document.createElement("div");
    ReactDOM.render(
        <ProgressBar percent={10} barColor="blue" />
        , root)
});

describe('ProgressBar', () => {
    describe('tests for rendering', () => {
        it('render div when given certain percent and barColor', () => {
            expect(root.childNodes[0].nodeName).toBe("DIV");
        });
        it('has className ="progress" when given certain percent and barColor ', () => {
            expect(root.childNodes[0].className).toBe("progress");
        });
        it('has className = "progress__bar--blue" when given barColor="blue" ', () => {
            expect(root.childNodes[0].childNodes[0].className).toMatch(/progress__bar--blue/);
        });
        it('has width = "10%" when given percent={10} ', () => {
            expect(root.childNodes[0].childNodes[0].style.width).toBe("10%");
        });
    });
});

beforeEach(() => {
    progressRenderer = TestRenderer.create(
        <ProgressBar percent={10} barColor="blue" />
    );
});
describe('ProgressBar with react-test-renderer', () => {
    describe('when given percent and barColor', () => {
        it('render properly', () => {
            expect(progressRenderer.toJSON()).toMatchSnapshot();
        });
        it('renders div when given certain percent and barColor', () => {
            expect(progressRenderer.toJSON().type).toBe("div");
        });
        it('has className ="progress" when given certain percent and barColor ', () => {
            expect(progressRenderer.toJSON().props.className).toBe("progress");
        });
        it('has className = "progress__bar--blue" when given barColor="blue" ', () => {
            expect(progressRenderer.toJSON().children[0].props.className).toMatch(/progress__bar--blue/);
        });
        it('has width = "10%" when given percent={10} ', () => {
            expect(progressRenderer.toJSON().children[0].props.style.width).toMatch(/10%/);
        });
    });
});