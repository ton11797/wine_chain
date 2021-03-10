import { IsEnum, IsUrl, Length, Max, MaxLength, Min } from "class-validator";
import {Country} from "../enum/countries.enum"

export class serialGeneratorBase{
    @Length(4, 7)
    symbol_series: string;
    
    @MaxLength(500,{
        message:"name MaxLength 50"
    })
    name: string;

    @IsUrl()
    picture: string;

    @MaxLength(50,{
        message:"wine_type MaxLength 50"
    })
    wine_type: string;

    @Max(3000,{
        message:"vintage Max 3000"
    })
    @Min(900,{
        message:"vintage min 900"
    })
    vintage: number;

    @IsEnum(Country,{
        message:"country enum invalid"
    })
    country: Country;
    
    @MaxLength(500,{
        message:"name MaxLength 50"
    })
    regions: string;

    @Max(10000000,{
        message:"bottle_count Max 10000000"
    })
    bottle_count: number;
}

export class serialGeneratorRDBMS extends serialGeneratorBase{
    statusQueue: string;
}

export class serialGeneratorDynamo extends serialGeneratorBase{
    status: string;
    running_number: string;
}