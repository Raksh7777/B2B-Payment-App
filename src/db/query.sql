CREATE TABLE users (user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL, phone_number varchar(13)NOT NULL,user_name varchar(25),is_Registered boolean DEFAULT false,created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp with time zone  DEFAULT CURRENT_TIMESTAMP)

