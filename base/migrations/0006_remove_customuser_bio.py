# Generated by Django 4.1 on 2023-08-07 00:46

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("base", "0005_customuser_bio"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="customuser",
            name="bio",
        ),
    ]
