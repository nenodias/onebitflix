class Api::V1::PlayerSerializer
  include FastJsonapi::ObjectSerializer
  set_type :execution
  belongs_to :movie
  attributes :id, :start_date, :end_date, :elapsed_time
 end