/*
  # Create weather_logs table

  1. New Tables
    - `weather_logs`
      - `id` (uuid, primary key, auto-generated)
      - `city` (text) - name of the city
      - `country` (text) - country of the city
      - `temperature` (integer) - temperature in celsius
      - `description` (text) - weather description
      - `fetched_at` (timestamptz) - when the weather was fetched

  2. Security
    - Enable RLS on `weather_logs` table
    - Add policy to allow anonymous inserts (public logging)
    - Add policy to allow anonymous reads (public viewing)

  3. Notes
    - This table logs every invocation of "Get Random City Weather"
    - No authentication required since this is a stress-testing tool
*/

CREATE TABLE IF NOT EXISTS weather_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  city text NOT NULL DEFAULT '',
  country text NOT NULL DEFAULT '',
  temperature integer NOT NULL DEFAULT 0,
  description text NOT NULL DEFAULT '',
  fetched_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE weather_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert weather logs"
  ON weather_logs
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anyone can read weather logs"
  ON weather_logs
  FOR SELECT
  TO anon
  USING (true);
