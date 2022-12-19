export interface UserProfile {
  id: number;
  username: string;
  resource_state: number;
  firstname: string;
  lastname: string;
  city: string;
  state: string;
  country: string;
  sex: string;
  premium: boolean;
  created_at: Date;
  updated_at: Date;
  badge_type_id: number;
  profile_medium: string;
  profile: string;
  friend: null;
  follower: null;
  follower_count: number;
  friend_count: number;
  mutual_friend_count: number;
  athlete_type: number;
  date_preference: string;
  measurement_preference: string;
  clubs: any[];
  ftp: null;
  weight: number;
  bikes: Bike[];
  shoes: Bike[];
}
interface Bike {
  id: string;
  primary: boolean;
  name: string;
  resource_state: number;
  distance: number;
}

export interface Activity {
  resource_state: number;
  athlete: Athlete;
  name: string;
  distance: number;
  moving_time: number;
  elapsed_time: number;
  total_elevation_gain: number;
  type: string;
  sport_type: string;
  workout_type: null;
  id: number;
  external_id: string;
  upload_id: number;
  start_date: Date;
  start_date_local: Date;
  timezone: string;
  utc_offset: number;
  start_latlng: null;
  end_latlng: null;
  location_city: null;
  location_state: null;
  location_country: string;
  achievement_count: number;
  kudos_count: number;
  comment_count: number;
  athlete_count: number;
  photo_count: number;
  map: Map;
  trainer: boolean;
  commute: boolean;
  manual: boolean;
  private: boolean;
  flagged: boolean;
  gear_id: string;
  from_accepted_tag: boolean;
  average_speed: number;
  max_speed: number;
  average_cadence: number;
  average_watts: number;
  weighted_average_watts: number;
  kilojoules: number;
  device_watts: boolean;
  has_heartrate: boolean;
  average_heartrate: number;
  max_heartrate: number;
  max_watts: number;
  pr_count: number;
  total_photo_count: number;
  has_kudoed: boolean;
  suffer_score: number;
}

export interface Athlete {
  id: number;
  resource_state: number;
}

export interface Map {
  id: string;
  summary_polyline: null;
  resource_state: number;
}
