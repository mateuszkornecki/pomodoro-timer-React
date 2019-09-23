import React from 'react';
import Clock from '../../components/Clock';
import ReactDOM from "react-dom"
import TestRenderer from 'react-test-renderer'; // ES6


var root = null;
var clockRenderer = null;

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

describe('<Clock/> with react-test-renderer', () => {
    beforeEach(() => {
        clockRenderer = TestRenderer.create(
            <Clock hours={1} minutes={20} seconds={42} miliseconds={311} />
        );
    });
    //! PYTANIE NA LIVE, dlaczego nie zrobić po prostu ...props.className żeby dostać się do konkretnego klucza?
    describe('when given hours, minutes, seconds, miliseconds', () => {
        it('renders properly', () => {
            expect(clockRenderer.toJSON()).toMatchSnapshot();
        });
        it('has className ="clock" ', () => {
            expect(clockRenderer.toJSON().props.className).toMatch(/clock/);
        });
        it('renders h2', () => {
            expect(clockRenderer.toJSON().type).toEqual("h2");
        });
        it('renders hours', () => {
            expect(clockRenderer.toTree().props.hours).toBe(1);
        });
        it('renders minutes', () => {
            expect(clockRenderer.toTree().props.minutes).toBe(20);
        });
        it('renders seconds', () => {
            expect(clockRenderer.toTree().props.seconds).toBe(42);
        });
        it('renders miliseconds', () => {
            expect(clockRenderer.toTree().props.miliseconds).toBe(311);
        });
    });
});