import React from 'react';
import ReactDOM from 'react-dom';
import ProgressBar from '../../components/ProgressBar';

var root;

beforeEach(() => {
    root = document.createElement("div");
    ReactDOM.render(
        <ProgressBar percent={10} barColor="blue" />
        , root)
})

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