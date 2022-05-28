import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {recipeActions, selectDescription, selectDisplayName, selectImageURL} from "../../store/recipe-slice";
import {AppDispatch} from "../../store";

export interface IBasicInfoEditProps {

}

export const BasicInfoEdit: React.FC<IBasicInfoEditProps> = () => {

    const dispatch = useDispatch<AppDispatch>();

    const displayName = useSelector(selectDisplayName);
    const imageURL = useSelector(selectImageURL);
    const description = useSelector(selectDescription);


    const displayNameChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        dispatch(recipeActions.setDisplayName(event.target.value));
    };

    const imageURLChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        dispatch(recipeActions.setImageURL(event.target.value));

    };

    const descriptionChangeHandler: React.ChangeEventHandler<HTMLTextAreaElement> = (event) => {
        dispatch(recipeActions.setDescription(event.target.value));

    };

    return (
        <div className="col-12">
            <div className="card px-0 mx-0 ">
                <div className="card-header">
                    Basic Information
                </div>
                <div className="card-body ">
                    <div className="mb-2">
                        <label htmlFor="display-name-input" className="form-label">Display name</label>
                        <input type="text"
                               className="form-control"
                               id="display-name-input"
                               value={displayName}
                               onChange={displayNameChangeHandler}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="image-url-input" className="form-label">Image URL</label>
                        <input type="url"
                               className="form-control"
                               id="image-url-input"
                               value={imageURL}
                               onChange={imageURLChangeHandler}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description-input" className="form-label">Description</label>
                        <textarea className="form-control"
                                  id="description-input"
                                  value={description}
                                  onChange={descriptionChangeHandler}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}