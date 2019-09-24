import React from "react";
import { render, fireEvent, cleanup, getAllByTestId } from '@testing-library/react';
import EditableTimebox from '../../components/EditableTimebox';


describe('<EditableTimebox />', () => {
    afterEach(cleanup);

    it('should allow me to type in taskTime input', () => {
        const { getByLabelText, debug } = render(<EditableTimebox />);
        fireEvent.change(getByLabelText(/minut/), { target: { value: 3 } })
        expect(getByLabelText(/minut/).value).toBe("3");
    });
    it('allow editing the timebox', () => {
        const { getByLabelText, getByText, debug } = render(<EditableTimebox />)
        fireEvent.change(getByLabelText(/minut/), { target: { value: 3 } })
        fireEvent.click(getByText(/zmiany/))
        fireEvent.click(getByText(/Edytuj/));
        expect(() => {
            getByText(/zmiany/);
        }).not.toThrow();
    });
    it('should allow me to set up taskTime', () => {
        const { getByLabelText, getByText, debug } = render(<EditableTimebox />);
        fireEvent.change(getByLabelText(/minut/), { target: { value: 3 } })
        fireEvent.click(getByText(/zmiany/))
        expect(() => {
            getByText(/03/);
        }).not.toThrow();
    });
    it('should allow me to set up title', () => {
        const { getByLabelText, getByText, debug } = render(<EditableTimebox />);
        fireEvent.change(getByLabelText(/robisz/), { target: { value: "Change Title Test" } })
        //have to setup taskTime too because of alert which appear when submiting with empty input
        fireEvent.change(getByLabelText(/minut/), { target: { value: 3 } })
        fireEvent.click(getByText(/zmiany/))
        expect(() => {
            getByText("Change Title Test");
        }).not.toThrow();
    });
});