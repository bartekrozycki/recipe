import {IStage} from "./IStage";

export interface Recipe {
    _id?: {
        $oid: string;
    };
    imageURL: string,
    description: string,
    stages: IStage[];
    displayName: string;
}