# Generated by Django 4.1 on 2023-08-03 07:30

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("base", "0004_customuser_books"),
    ]

    operations = [
        migrations.AddField(
            model_name="customuser",
            name="bio",
            field=models.TextField(blank=True, max_length=300, null=True),
        ),
    ]
