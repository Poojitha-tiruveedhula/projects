package com.example.weather;

import org.springframework.boot.*;
import org.springframework.boot.autoconfigure.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.json.JSONObject;

@SpringBootApplication
@RestController
public class WeatherApplication {

    // Replace with your OpenWeatherMap API key
    private static final String API_KEY = "YOUR_API_KEY";
    private static final String BASE_URL = "https://api.openweathermap.org/data/2.5";

    public static void main(String[] args) {
        SpringApplication.run(WeatherApplication.class, args);
        System.out.println("🌦 Weather Forecast Application is running...");
        System.out.println("Try: http://localhost:8080/weather/current/Delhi");
    }

    @GetMapping("/weather/current/{city}")
    public String getCurrentWeather(@PathVariable String city) {
        try {
            RestTemplate restTemplate = new RestTemplate();
            String url = BASE_URL + "/weather?q=" + city + "&appid=" + API_KEY + "&units=metric";
            String response = restTemplate.getForObject(url, String.class);

            JSONObject json = new JSONObject(response);
            JSONObject main = json.getJSONObject("main");
            JSONObject weather = json.getJSONArray("weather").getJSONObject(0);

            double temp = main.getDouble("temp");
            int humidity = main.getInt("humidity");
            String desc = weather.getString("description");

            return "🌍 City: " + city + "\n" +
                   "🌡 Temperature: " + temp + " °C\n" +
                   "💧 Humidity: " + humidity + " %\n" +
                   "☁️ Condition: " + desc;
        } catch (Exception e) {
            return "❌ Error fetching weather data for city: " + city + "\n" + e.getMessage();
        }
    }

    @GetMapping("/weather/forecast/{city}")
    public String getFiveDayForecast(@PathVariable String city) {
        try {
            RestTemplate restTemplate = new RestTemplate();
            String url = BASE_URL + "/forecast?q=" + city + "&appid=" + API_KEY + "&units=metric";
            String response = restTemplate.getForObject(url, String.class);

            JSONObject json = new JSONObject(response);
            StringBuilder sb = new StringBuilder();
            sb.append("📅 5-Day Forecast for ").append(city).append(":\n\n");

            var list = json.getJSONArray("list");
            for (int i = 0; i < list.length(); i += 8) { // every 8 items ~ 1 day
                JSONObject obj = list.getJSONObject(i);
                String date = obj.getString("dt_txt");
                JSONObject main = obj.getJSONObject("main");
                JSONObject weather = obj.getJSONArray("weather").getJSONObject(0);

                double temp = main.getDouble("temp");
                String desc = weather.getString("description");

                sb.append("📆 Date: ").append(date)
                  .append("\n🌡 Temp: ").append(temp).append(" °C")
                  .append("\n☁️ Condition: ").append(desc)
                  .append("\n----------------------\n");
            }
            return sb.toString();

        } catch (Exception e) {
            return "❌ Error fetching forecast data for city: " + city + "\n" + e.getMessage();
        }
    }
}