-- Create the function that updates updated_at field
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for all tables

CREATE TRIGGER set_updated_at_companies
BEFORE UPDATE ON companies
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER set_updated_at_company_status
BEFORE UPDATE ON company_status
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER set_updated_at_countries
BEFORE UPDATE ON countries
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER set_updated_at_game_engines
BEFORE UPDATE ON game_engines
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER set_updated_at_game_engines_games
BEFORE UPDATE ON game_engines_games
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER set_updated_at_game_genres
BEFORE UPDATE ON game_genres
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER set_updated_at_game_keywords
BEFORE UPDATE ON game_keywords
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER set_updated_at_game_modes
BEFORE UPDATE ON game_modes
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER set_updated_at_game_player_perspectives
BEFORE UPDATE ON game_player_perspectives
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER set_updated_at_game_types
BEFORE UPDATE ON game_types
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER set_updated_at_games
BEFORE UPDATE ON games
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER set_updated_at_genres
BEFORE UPDATE ON genres
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER set_updated_at_involved_companies
BEFORE UPDATE ON involved_companies
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER set_updated_at_keywords
BEFORE UPDATE ON keywords
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER set_updated_at_platforms
BEFORE UPDATE ON platforms
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER set_updated_at_platforms_families
BEFORE UPDATE ON platforms_families
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER set_updated_at_platforms_types
BEFORE UPDATE ON platforms_types
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER set_updated_at_player_perspectives
BEFORE UPDATE ON player_perspectives
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER set_updated_at_time_to_beat
BEFORE UPDATE ON time_to_beat
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();
