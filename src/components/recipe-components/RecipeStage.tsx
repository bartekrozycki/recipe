import React from "react";
import {Card} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {recipeActions, selectActiveStage, selectCurrentStage} from "../../store/recipe-slice";
import {RangeInput} from "./RangeInput";
import {AppDispatch} from "../../store";


interface IStepProps {
    headerFormat: string;
}

export const RecipeStage: React.FC<IStepProps> = (props) => {

    const stage = useSelector(selectCurrentStage);
    const activeStage = useSelector(selectActiveStage);

    const dispatch = useDispatch<AppDispatch>();


    const heatChangeHandler = (value: number) => {
        dispatch(recipeActions.setHeat(value));
    };
    const mixChangeHandler = (value: number) => {
        dispatch(recipeActions.setMix(value));

    };
    const durationChangeHandler = (value: number) => {
        dispatch(recipeActions.setDuration(value));
    };


    return (
        <Card>
            <Card.Header>
                {props.headerFormat.replace("%n", activeStage.toString())}
            </Card.Header>
            <Card.Body>

                <div className="container-fluid p-0">
                    <div className="row">

                        <div className="col-4">
                            <RangeInput label={"Heat level: %n"}
                                        min={0}
                                        max={12}
                                        step={1}
                                        value={stage.heat}
                                        setValue={heatChangeHandler}/>
                        </div>
                        <div className="col-4">
                            <RangeInput label={"Mix level: %n"}
                                        min={0}
                                        max={12}
                                        step={1}
                                        value={stage.mix}
                                        setValue={mixChangeHandler}/>
                        </div>
                        <div className="col-4">
                            <RangeInput label={"Time (seconds): %n"}
                                        min={0}
                                        max={720}
                                        step={10}
                                        value={stage.duration}
                                        setValue={durationChangeHandler}/>
                        </div>
                    </div>
                </div>


                {stage.description}

            </Card.Body>
        </Card>
    )
};

export default RecipeStage;