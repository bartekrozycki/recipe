import React from "react";
import {ListGroup} from "react-bootstrap";
import "./StepSelector.css";
import {useDispatch, useSelector} from "react-redux";
import {recipeActions, selectActiveStage, selectStages} from "../../store/recipe-slice";
import {AppDispatch} from "../../store";

interface IStepSelectorProps {
    headerFormat: string;
}

export const StepSelector: React.FC<IStepSelectorProps> = (props) => {
    const dispatch = useDispatch<AppDispatch>();
    const stages = useSelector(selectStages);
    const activeStage = useSelector(selectActiveStage);

    const addStepHandler: React.MouseEventHandler = (event) => {
        event.preventDefault();
        dispatch(recipeActions.addStage());
        dispatch(recipeActions.setActiveStage(stages.length))
    };

    const elements = stages.length > 0 && stages.map(
        (value, index) => {
            const onClick = () => dispatch(recipeActions.setActiveStage(index));
            const isActive = activeStage === index;

            return (
                <ListGroup.Item
                    key={index}
                    onClick={onClick}
                    active={isActive}>
                    {
                        props.headerFormat.replace("%n", Number(index + 1).toString())
                    }
                </ListGroup.Item>
            );
        }
    );

    return (
        <>

            <ListGroup as="ol" numbered className={"list-group--item__background"}>
                {elements}
            </ListGroup>
            <button
                className="btn btn-outline-primary mt-2 btn__fullwidth"
                type="button" onClick={addStepHandler}
            >
                Add step
            </button>
        </>
    )
};

export default StepSelector;

