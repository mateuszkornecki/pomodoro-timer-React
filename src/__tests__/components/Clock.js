import React from 'react';
import Clock from '../../components/Clock';
import ReactDOM from "react-dom"

var root = null;

describe('<Clock/>', () => {
    beforeEach(() => {
        root = document.createElement('div');
        ReactDOM.render(
            <Clock hours={1} minutes={20} seconds={42} miliseconds={311} />
            , root);
    });
    describe('tests for rendering', () => {
        it('render h2 when given hours, minutes , seconds and miliseconds', () => {
            expect(root.childNodes[0].nodeName).toBe("H2");
        });
        it('has className ="clock" when given hours, minutes, seconds, and miliseconds', () => {
            expect(root.childNodes[0].className).toMatch(/clock/);
        });
        it('render time properly when given hours, minutes, seconds and miliseconds', () => {
            expect(root.childNodes[0].textContent).toMatch(/01:20:42:311/);
        });

    });
    describe('sets correctly default props values', () => {
        it('sets Classname to empty string and hours,minutes, seconds, miliseconds to 0 if not given anything else', () => {
            expect(<Clock />).toEqual(<Clock className="" hours={0} minutes={0} seconds={0} miliseconds={0} />);
        });
    });
});