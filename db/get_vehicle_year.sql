SELECT vehicles.*, users.name FROM vehicles 
JOIN users ON vehicles.owner_id = users.id
WHERE vehicles.year > 2000 ORDER BY vehicles.year DESC;