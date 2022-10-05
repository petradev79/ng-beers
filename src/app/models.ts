export interface Cart {
  items: Array<CartItem>;
}

export interface CartItem {
  beer: Beer;
  quantity: number;
}

export interface Filter {
  title: string;
  name: string;
  value: string;
}

export interface Filters {
  malt: {
    title: string;
    maltFilters: Filter[];
  };
  hops: {
    title: string;
    hopsFilters: Filter[];
  };
}

export interface Beer {
  abv: number;
  attenuation_level: number;
  boil_volume: { value: number; unit: string };
  brewers_tips: string;
  contributed_by: string;
  description: string;
  ebc: number;
  first_brewed: string;
  food_pairing: string[];
  ibu: number;
  id: number;
  image_url: string;
  ingredients: Ingredients;
  method: Method;
  name: string;
  ph: string;
  srm: number;
  tagline: string;
  target_fg: number;
  target_og: number;
  volume: { value: number; unit: string };
}

export interface Ingredients {
  hops: Hops[];
  malt: Malt[];
  yeast: string;
}

export interface Hops {
  add: string;
  amount: {
    value: number;
    unit: string;
  };
  attribute: string;
  name: string;
}

interface Malt {
  amount: {
    value: number;
    unit: string;
  };
  name: string;
}

interface Method {
  fermentation: {
    temp: {
      value: number;
      unit: string;
    };
  };
  mash_temp: {
    duration: number;
    temp: {
      value: number;
      unit: string;
    };
  }[];
  twist: string;
}
