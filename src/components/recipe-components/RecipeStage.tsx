import React, {useCallback, useEffect, useMemo, useState} from "react";
import {Card} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {recipeActions, selectActiveStage, selectCurrentStage, selectIngredients} from "../../store/recipe-slice";
import {RangeInput} from "./RangeInput";
import {AppDispatch} from "../../store";
import {getProductsSuggestions} from "../../api/productAPI";
import {Product} from "../../interfaces";

const DEBOUNCE_IN_MILLISECONDS = 500;

interface IStepProps {
    headerFormat: string;
}

export const RecipeStage: React.FC<IStepProps> = (props) => {

    const stage = useSelector(selectCurrentStage);
    const activeStage = useSelector(selectActiveStage) + 1;
    const ingredients = useSelector(selectIngredients);

    const [apiProducts, setApiProducts] = useState<Product[]>([]);
    const [productFinder, setProductFinder] = useState<string>("");

    const dispatch = useDispatch<AppDispatch>();


    const heatChangeHandler = useCallback(
        (temperature: number) => {
            dispatch(recipeActions.setHeat(temperature));
        }, [dispatch]
    );

    const mixChangeHandler = useCallback(
        (level: number) => {
            dispatch(recipeActions.setMix(level));
        },
        [dispatch],
    );

    const durationChangeHandler = useCallback(
        (time: number) => {
            dispatch(recipeActions.setDuration(time));
        },
        [dispatch],
    );

    const addIngredientHandler = useCallback(
        (product: Product) => {
            dispatch(recipeActions.addIngredient(product));
        },
        [dispatch],
    );

    const removeIngredientHandler = useCallback(
        (oid: string) => {
            dispatch(recipeActions.removeIngredientByOID(oid));
        },
        [dispatch],
    );

    const changeIngredientHandler = useCallback(
        (oid: string, value: number) => {
            dispatch(recipeActions.changeIngredient({oid, value}));
        },
        [dispatch],
    );

    useEffect(() => {
        const fetchProducts = async () => {
            setApiProducts(
                await getProductsSuggestions(productFinder)
            );
        };

        const debounce = setTimeout(fetchProducts, DEBOUNCE_IN_MILLISECONDS);

        return () => {
            clearTimeout(debounce);
        };
    }, [productFinder]);


    const apiProductsTable = useMemo(() => (
        <div className={"container-fluid my-2"}>
            {
                apiProducts.length > 0 && apiProducts.map(
                    value => (
                        <div className={"row my-1"} key={value._id.$oid}>
                            <div className="col-6 d-flex align-items-center">
                                {value.displayName}
                            </div>
                            <div className="col-6 d-flex align-items-center justify-content-end">
                                <button className="btn btn-toolbar"
                                        onClick={() => {
                                            addIngredientHandler(value);
                                        }}>
                                    +
                                </button>
                            </div>
                        </div>
                    )
                )
            }
        </div>
    ), [apiProducts, addIngredientHandler]);

    const ingredientsTable = useMemo(() => (
        <div className={"container-fluid my-2"}>
            {
                ingredients.length > 0 ? ingredients.map(
                    value => (
                        <div className={"row my-1"} key={value.product._id.$oid}>
                            <div className="col-4 d-flex align-items-center">
                                {value.product.displayName}
                            </div>
                            <div className="col-4 d-flex align-items-center">
                                <input type="number"
                                       className={"form-control form-control-plaintext ingredients--input__enchantment"}
                                       value={value.amount}
                                       onChange={(e) => changeIngredientHandler(value.product._id.$oid, Number(e.target.value))}
                                />
                                <span className={"ms-2"}>
                                    {value.product.unit}
                            </span>
                            </div>
                            <div className="col-4 d-flex align-items-center justify-content-end">
                                <button className="btn-close"
                                        onClick={() => removeIngredientHandler(value.product._id.$oid)} />
                            </div>
                        </div>
                    )
                ) : <p>Add some ingredients! :)</p>
            }
        </div>
    ), [ingredients, removeIngredientHandler, changeIngredientHandler]);

    return (
        <Card>
            <Card.Header>
                {props.headerFormat.replace("%n", activeStage.toString())}
            </Card.Header>
            <Card.Body>

                <div className="container-fluid p-0">
                    <div className="row">
                        <div className="col-4">
                            <RangeInput label={"Temperature: %n°C"}
                                        min={0}
                                        max={260}
                                        step={10}
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

                    <div className="row mt-3">
                        <h2>Ingredients</h2>
                        <div className="col-12">
                            {ingredientsTable}
                        </div>

                    </div>


                    <div className="row mt-3">
                        <div className="col-12">
                            <input className="form-control"
                                   list="datalistOptions"
                                   id="exampleDataList"
                                   placeholder="Type to search..."
                                   value={productFinder}
                                   onChange={(event) => setProductFinder(event.target.value)}
                            />
                            {apiProductsTable}
                        </div>
                    </div>


                </div>
            </Card.Body>
        </Card>
    )
};

export default RecipeStage;