# Generated by Django 4.1 on 2023-08-02 22:03

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("base", "0002_match_message"),
    ]

    operations = [
        migrations.AddField(
            model_name="message",
            name="image",
            field=models.CharField(blank=True, default="", max_length=500, null=True),
        ),
    ]